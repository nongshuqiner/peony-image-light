## props
|参数         | 是否必须    | 说明        |类型        |可选值       |默认值       |
|------------|------------|------------|------------|------------|------------|
|feedEvent    | 是          |与事件中的feedEvent事件一致；返回value下子项的index, 返回value下的子项value, 返回事件event |Function    |-        |-         |
|value        | 是          |图片对象|Array    |-  |-      |
|optional|否|判断是否为选中状态，如果为选中状态，会执行checkbox返回选中的|Boolean|true, false|false|
|deletable|否| 是否可以删除| Boolean| true, false| false|
## event
|事件名称|说明|回调参数|
|--------|--------|--------|
|feedEvent            |反馈事件-获取反馈的数据   |index(索引)，value(子项)， event(事件名称)|
