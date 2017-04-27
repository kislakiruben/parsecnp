import Parser from './Parser';

function ParseCNP(CNP) {
    if (!(this instanceof Parser)) {
        return new Parser(CNP);
    }

    return this;
}

export default ParseCNP;
