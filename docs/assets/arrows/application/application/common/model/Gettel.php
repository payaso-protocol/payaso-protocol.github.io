<?php
namespace app\common\model;

use think\Model;


class Gettel extends Model
{

    

    

    // 表名
    protected $name = 'gettel';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = false;
    protected $deleteTime = false;

    // 追加属性
    protected $append = [

    ];

    protected static function init()
    {
        // 如果已经上传该资源，则不再记录
        self::beforeInsert(function ($model) {
          $model['ip'] = $_SERVER['SERVER_ADDR'];
        });
    }
    

    







}
