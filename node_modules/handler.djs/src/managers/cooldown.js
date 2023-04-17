const { Message } = require('discord.js');

/**
 * 
 * @param {String} content 
 * @param {Message} message 
 * @param {Number} counter 
 */

module.exports = async (content, message, counter) => {
    
    const AuthorId = message.author.id;
    const AuthorMention = message.author;
    const AuthorTag = message.author.tag;
    const AuthorUsername = message.author.username;
    const Counter = counter;

    const REG_AuthorId = /\{UserId}/g;
    const REG_AuthorMention = /\{UserMention}/g;
    const REG_AuthorTag = /\{UserTag}/g;
    const REG_AuthorUsername = /\{Username}/g;
    const REG_Counter = /\{counter}/g;

    content = content.replace(REG_AuthorId, AuthorId);
    content = content.replace(REG_AuthorMention, AuthorMention);
    content = content.replace(REG_AuthorTag, AuthorTag);
    content = content.replace(REG_AuthorUsername, AuthorUsername);
    content = content.replace(REG_Counter, Counter);

    return content;
}
