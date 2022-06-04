const ifCond = function() {
    
    let operation = '';

    for(let i = 0; i < arguments.length - 1; i++) {
        if(i%2 === 0) {
            if(typeof arguments[i] === 'object') operation += true;
            else operation += arguments[i] ? `"${arguments[i]}"` : undefined;
        } else {
            operation += arguments[i];
        }
        
    }

    const options = arguments[arguments.length - 1];

    const evaluated = eval(operation);

    if(evaluated) {
        return options.fn(this);
    }
    
    return options.inverse(this);
}

module.exports = {
    ifCond
}