let fs=require('fs');
let express = require('express');
let app = express();
let prompt = require('prompt');
let bodyParser = require('body-parser');
app.use(bodyParser());
app.get('/', function(req, resp){
  resp.sendFile('index.html',{root: './'});
});
app.post('/',function(req, resp){
  let teamSize = req.body.teamsize;
  let fileName = req.body.filename;   
   fs.readFile(fileName, "utf8", function(err, contents) {
            if(err) return console.log(err);        
        let jsonContent = JSON.parse(contents);
        console.log('User Input Received');
        aspirantsCount = jsonContent.aspirants.length;
        console.log(aspirantsCount);
        if ( teamSize == parseInt(teamSize,10) && teamSize > 0 && teamSize < aspirantsCount){
            let mod = aspirantsCount % teamSize;
            let team = 1;
            let temp = teamSize;
            let count = 0;
            let remList = jsonContent.aspirants;        
            if (mod != 0){
                    if (req.body.yorn.toLowerCase() == "y"){
                        fs.writeFile('result.txt', '', function(){});                            
                        fs.writeFile('result.txt',"Teams :\n",function (err){
                            if (err) throw err;
                        });
                        while(count < aspirantsCount){
                            if (temp == teamSize){
                                let i = Math.floor(Math.random() * remList.length);
                                let person = remList[i];
                                fs.appendFile("result.txt",`\nTeam ${team}`,function (err){
                                    if (err) throw err;
                                });
                                if( mod != 0 ){
                                fs.appendFile("result.txt",Object.keys(person).join(" "),function (err){
                                    if (err) throw err;
                                });
                                remList.splice(i, 1);
                                mod -= 1;
                                count += 1;
                                }
                                temp = 0;
                                team += 1;
                            }
                            let i = Math.floor(Math.random() * remList.length);
                            let person = remList[i];
                            fs.appendFile("result.txt",Object.keys(person).join(" "),function (err){
                                if (err) throw err;
                            });
                            remList.splice(i, 1);                        
                            temp += 1;
                            count += 1;
                        }
                        fs.appendFile("result.txt","\n\rAsync functions not handled, thus unordered Result.",function (err){
                            if (err) throw err;
                        });
                    }
                    else{
                        fs.writeFile('result.txt', '', function(){});                                                    
                        console.log("Thank you!!!")
                    }
            }
            else{
                fs.writeFile('result.txt', '', function(){});                    
                fs.writeFile('result.txt',"Teams :\n",function (err){
                    if (err) throw err;
                });
                while(count < aspirantsCount){
                    let i = Math.floor(Math.random() * remList.length);
                    let person = remList[i];
                    if (temp == teamSize){
                        fs.appendFile("result.txt",'\nTeam '+team,function (err){
                            if (err) throw err;
                        });
                        temp = 0;
                        team += 1;
                    }
                    fs.appendFile("result.txt",Object.keys(person).join(" "),function (err){
                        if (err) throw err;
                    });
                    temp += 1;
                    count += 1;
                    remList.splice(i, 1);
                }
                fs.appendFile("result.txt","\n\rAsync functions not handled, thus unordered Result.",function (err){
                    if (err) throw err;
                });
            }
        }
        else{
            fs.writeFile('result.txt',"Enter number between 1 and "+aspirantsCount,function (err){
                if (err) throw err;
            });        
        }
    });
    resp.writeHead(200,{'Content-Type':'text/plain'});
    let myReadStream=fs.createReadStream(__dirname+'/result.txt','utf-8');
    myReadStream.pipe(resp);
    let writeStream = fs.createWriteStream('log.txt',{'flags':'a'});
    writeStream.write('We had visit at '+ new Date()+'\n');
    writeStream.end();
});
app.listen(3000,function(){
  console.log('Listen 3000');
});