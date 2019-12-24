##  样式规范
react-native中所有尺寸单位默认为dp，为保持与设计稿一致做了转换处理
即当设置宽度为375时即为屏幕宽度

###  Size

主要包含 width, height, screenWidth, screenHeight, hairlineWidth

width、height为rn默认以dp为单位的屏幕宽高

screenWidth、screenHeight 基于设计稿尺寸做转换的屏幕宽高

hairlineWidth 发丝线   即为设备所能绘制的最细尺寸  一般用于边框  不同设备表现会不同


### Style

commonStyle内放置公共类样式， Colors、Size放置颜色和尺寸单属性样式

