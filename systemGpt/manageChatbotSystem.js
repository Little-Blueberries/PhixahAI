function manageChatbotSystem() {
    this.documents = [];
    this.responses = [];
    this.wordIDF = {};
}
manageChatbotSystem.prototype.addData = function(question, response) {
    this.documents.push(question);
    this.responses.push(response);
};
manageChatbotSystem.prototype.calculateTF = function(word, document) {
    var words = document.split(/\s+/);
    var count = 0;
    for (var i = 0; i < words.length; i++) {
        if (words[i] === word) count++;
    }
    return count / words.length;
};
manageChatbotSystem.prototype.calculateIDF = function(word) {
    if (this.wordIDF[word] !== undefined) return this.wordIDF[word];
    var count = 0;
    for (var i = 0; i < this.documents.length; i++) {
        if (this.documents[i].split(/\s+/).indexOf(word) !== -1) count++;
    }
    var idf = Math.log(this.documents.length / (1 + count)) + 1;
    this.wordIDF[word] = idf;
    return idf;
};
manageChatbotSystem.prototype.computeVector = function(doc) {
    var words = doc.split(/\s+/);
    var tfidf = {};
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        if (!tfidf[word]) {
            tfidf[word] = this.calculateTF(word, doc) * this.calculateIDF(word);
        }
    }
    return tfidf;
};
manageChatbotSystem.prototype.cosineSimilarity = function(v1, v2) {
    var sum = 0, mag1 = 0, mag2 = 0;
    var keys = {};
    for (var key in v1) keys[key] = true;
    for (var key in v2) keys[key] = true;
    for (var key in keys) {
        var a = v1[key] || 0;
        var b = v2[key] || 0;
        sum += a * b;
        mag1 += a * a;
        mag2 += b * b;
    }
    if (mag1 === 0 || mag2 === 0) return 0;
    return sum / (Math.sqrt(mag1) * Math.sqrt(mag2));
};
manageChatbotSystem.prototype.findAnswer = function(userInput) {
    var inputVector = this.computeVector(userInput);
    var maxScore = 0;
    var answer = "Sorry, I don't understand."
    for (var i = 0; i < this.documents.length; i++) {
        var docVector = this.computeVector(this.documents[i]);
        var score = this.cosineSimilarity(inputVector, docVector);
        if (score > maxScore) {
            maxScore = score;
            answer = this.responses[i];
        }
    }
    return answer;
}