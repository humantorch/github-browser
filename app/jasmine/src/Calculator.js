var Calculator = function() {
	var add = function(a,b) {
		if (!a || !b) {
			throw new Error('The add method expects two numbers');
		}
		return a+b;
	};

	return {
		add: add
	};
};