const AST = {
    sum: value => new AST_BinaryOp(value),
    product: value => new AST_BinaryOp(value),
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
    }
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