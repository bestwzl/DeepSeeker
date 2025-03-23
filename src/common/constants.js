function BizEnum(enums) {
	this.enums = enums;
}
// 获取列表
BizEnum.prototype.getList = function () {
	return this.enums;
}

// 根据code拿汉字
BizEnum.prototype.getText = function (code) {
	for (let key in this.enums) {
		if (this.enums[key].code == code) {
			return this.enums[key].text;
		}
	}
	return '';
}

// 根据汉字拿code
BizEnum.prototype.getCode = function (text) {
	for (let key in this.enums) {
		if (this.enums[key].text == text) {
			return this.enums[key].code;
		}
	}
	return '';
}

export default {

	// 性别
	GENDER: new BizEnum([
		{code: '1', text: '女'},
		{code: '2', text: '男'}
	]),

	// 角色
	ROLE: new BizEnum([
		{code: '1', text: '超级管理员'},
		{code: '2', text: '管理员'},
		{code: '3', text: '用户'},
	]),

	// 账号状态
	STATUS: new BizEnum([
		{code: '1', text: '正常'},
		{code: '2', text: '停用'},
		{code: '3', text: '使用中'},
	]),

	//常用正则
	REG: {
		tel   : /^1[3456789]\d{9}$/,   // 手机号码
		ein   : /^[0-9A-Z]{18}$/,      // 税号
		hukou : /^[a-zA-Z0-9]{3,21}$/, // 户口本
		phone : /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,  // 联系电话（包括手机、座机）
		idCard  : /(^\d{15}$)|(^\d{17}([0-9]|X)$)/, // 身份证号简单校验
		bankNum : /^\d{12,30}$/, // 银行账号
		realName  : /(^[\u4E00-\u9FA5]{2,8}$)|(^[0-9a-zA-Z]{2,18}$)/, // 姓名
		password  : /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/, // 密码：6到18位字母数字组合
		loginName : /^[0-9a-zA-Z]{3,20}$/, // 注册账号
		twoDecimal  : /(^[0-9]{1,20}$)|(^[0-9]{1,20}[.][0-9]{1,2}$)/, // 2位小数
		materialBarcode  : /^[A-Za-z0-9]+$/, // 商品条码
		positiveInteger  : /^[1-9]\d*$/, // 正整数
		birthCertificate : /^[a-zA-Z0-9]{5,21}$/, // 出生证
		socialCreditCode : /^[0-9a-zA-Z]{18}$/, // 社会信用代码
		nonnegativeInteger : /^\d+$/, // 非负整数
	},

	DEFAULTPASSWORD: '12345678', // 默认初始密码

}
