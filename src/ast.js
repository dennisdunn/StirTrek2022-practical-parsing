class AST {
    static open_lparen = () => new AST_OpenParen();
    static close_paren = () => new AST_CloseParen();
    static sum_op = value => new AST_BinaryOp(value);
    static prod_op = value => new AST_BinaryOp(value);
    static number = value => new AST_Number(value);

    static head_handler = value => {
        if (Array.isArray(value)) {
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
    };

    static tail_handler = value => {
        if (Array.isArray(value)) {
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
    };
}

class AST_Node {
    constructor(type, value = null) {
        this.type = type.toUpperCase();
        if (value) this.value = value;
    }
}

class AST_OpenParen extends AST_Node {
    constructor() {
        super('open_paren');
    }
}

class AST_CloseParen extends AST_Node {
    constructor() {
        super('close_paren');
    }
}

class AST_BinaryOp extends AST_Node {
    constructor(value) {
        super('binary_op', value);
    }
}

class AST_Number extends AST_Node {
    constructor(value) {
        super('number', value);
    }
}

module.exports = {
    AST
}