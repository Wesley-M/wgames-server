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
        text = CampaignURLGenerator.replaceBySpace(text);
        text = CampaignURLGenerator.replaceAccents(text);
        text = CampaignURLGenerator.replaceUpperCase(text);
        text = CampaignURLGenerator.replaceMultipleSpaces(text);
        text = text.trim();
        text = CampaignURLGenerator.replaceSpaceByHiphen(text);
        return text;
    }

}

module.exports = Normalizer;