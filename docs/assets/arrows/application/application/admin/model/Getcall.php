<?php

namespace app\admin\model;

use think\Model;


class Getcall extends Model
{

    

    

    // 表名
    protected $name = 'getcall';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = false;
    protected $deleteTime = false;

    // 追加属性
    protected $append = [
        'calltime_text'
    ];
    

    



    public function getCalltimeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['calltime']) ? $data['calltime'] : '');
        return is_numeric($value) ? date("Y-m-d H:i:s", $value) : $value;
    }

    protected function setCalltimeAttr($value)
    {
        return $value === '' ? null : ($value && !is_numeric($value) ? strtotime($value) : $value);
    }


}
