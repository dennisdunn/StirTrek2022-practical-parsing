const AST = {
    binary: value => new AST_BinaryOp(value),
    unary: value => new AST_UnaryOp(value),
    number: value => new AST_Number(value),

    head_handler: value => {
        if (Array.isArray(value)) {
            value = value.filter(item => item);
            switch (value.length) {
                case 1:
                    return value[0];
                case 2:
                    value[1].left = value[0];
                    break;
            }
            return value[1];
        }
        return value;
    },

    tail_handler: value => {
        if (Array.isArray(value)) {
            value = value.filter(item => item);
            switch (value.length) {
                case 1:
                    return value[0];
                case 2:
                    value[0].right = value[1];
                    break;
                case 3:
                    value[2].left = value[1];
                    value[0].right = value[2];
                    break;
            }
            return value[0];
        }
        return value;
    },

    func: value => {
        if (Array.isArray(value)) {
            value = value.filter(item => item);
            switch (value.length) {
                case 4:
                    value[0].left = value[2];
                    break;
            }
            return value[0];
        }
        return value;
    },

    post: value => {
        if (Array.isArray(value)) {
            value = value.filter(item => item);
            switch (value.length) {
                case 2:
                    value[1].left = value[0];
                    break;
            }
            return value[1];
        }
        return value;
    },
}

class AST_Node {
    constructor(value = null) {
        if (value) this.value = value;
    }

    eval() { }
}

class AST_BinaryOp extends AST_Node {
    constructor(value) {
        super(value);
    }

    eval() {
        const operand_a = this.left.eval();
        const operand_b = this.right.eval();
        switch (this.value) {
            case '+':
                return operand_a + operand_b;
            case '-':
                return operand_a - operand_b;
            case '*':
                return operand_a * operand_b;
            case '/':
                return operand_a / operand_b;
            case 'rem':
            case '%':
                return operand_a % operand_b; // javascript % is rem not mod!
            case 'mod':
                return operand_a - Math.floor(operand_a / operand_b) * operand_b
            case '^':
                return Math.pow(operand_a, operand_b);
            default:
                throw new SyntaxError(`unknown operation "${this.value}`);
        }
    }
}

class AST_UnaryOp extends AST_Node {
    constructor(value) {
        super(value);
    }

    static factorial(n) {
        return n === 0 ? 1 : n * AST_UnaryOp.factorial(n - 1);
    }

    eval() {
        const operand_a = this.left.eval();
        switch (this.value) {
            case '!':
                return AST_UnaryOp.factorial(operand_a);
            case 'sin':
                return Math.sin(operand_a);
            case 'cos':
                return Math.cos(operand_a);
            case 'tan':
                return Math.tan(operand_a);
            default:
                throw new SyntaxError(`unknown operation "${this.value}`);
        }
    }
}

class AST_Number extends AST_Node {
    constructor(value) {
        super(value);
    }

    eval() {
        return parseFloat(this.value);
    }
}

module.exports = {
    AST
}