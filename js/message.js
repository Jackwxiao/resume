

var APP_ID = 'WbkARBu1hJwNlF0kpON7ONPY-gzGzoHsz';
var APP_KEY = 'VAtaKjFTxKFAIotYFpCYYGNi';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});
console.log('1234')


//创建 testObject 表
var TestObject = AV.Object.extend('TestObject');
//在表中创建一行数据
var testObject = new TestObject();
testObject.set('words', 'Hello world!');
//数据内容是 words:'hello world！'
//如果保存成功，则打出保存成功
testObject.save().then(function (testObject) {
  console.log('保存成功。')
})