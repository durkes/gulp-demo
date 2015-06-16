module.exports = function (message) {
	alertify.log(message);
	alertify.success(message);
	alertify.error(message);
};