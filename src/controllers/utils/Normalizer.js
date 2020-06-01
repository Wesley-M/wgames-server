class Normalizer {
    static replaceBySpace (text) {
        return text.replace(/(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g," ");
    }

    static replaceAccents (text) {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    static replaceUpperCase (text) {
        return text.toLowerCase();
    }

    static replaceMultipleSpaces(text) {
        return text.replace(/ +/g, " ");
    }

    static replaceSpaceByHiphen(text) {
        return text.replace(/ /g, "-");
    }

    static normalize(text) {
        text = Normalizer.replaceBySpace(text);
        text = Normalizer.replaceAccents(text);
        text = Normalizer.replaceUpperCase(text);
        text = Normalizer.replaceMultipleSpaces(text);
        text = text.trim();
        text = Normalizer.replaceSpaceByHiphen(text);
        return text;
    }

}

module.exports = Normalizer;