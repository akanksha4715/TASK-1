const sha256 = require('crypto-js/SHA256');
class Block{
    constructor(height,body,time,previoushash=''){
        this.height=height;
        this.body=body;
        this.time=time;
        this.previoushash=previoushash;
        this.hash=this.calculateHash();
    }
    calculateHash(){
        return sha256(this.height+this.previoushash+this.time+JSON.stringify(this.body)).toString();
    }
    
}
class Blockchain{
        constructor(){
            this.chain= [this.creategenesisblock()];
        }
        creategenesisblock(){
            return new Block(0,"This is a genesis block","01/10/2020","0");
        }
        addblock(newBlock){
            newBlock.previoushash= this.getlatestBlock().hash;
            newBlock.hash =newBlock.calculateHash();
            this.chain.push(newBlock);
        }
        getlatestBlock(){
            return this.chain[this.chain.length-1];
        }
        Validate(){
            for(let i=1;i<this.chain.length;i++){
                const currentBlock = this.chain[i];
                const prevBlock = this.chain[i-1];
                if(currentBlock.hash!= currentBlock.calculateHash())
                return false;
                if(currentBlock.previoushash!= prevBlock.hash)
                return false;
            }
            return true;
        }
        seechain(){
            console.log(JSON.stringify(mybkc,null,4));
        }
        seeht(){
            for(let i=0;i<this.chain.length;i++){
            let x = (JSON.stringify(mybkc.chain[i].height,null,4));
            console.log("Height of Block ",i+1," is ",x);
            }
        }
}
let mybkc= new Blockchain();
mybkc.addblock(new Block(1,{transfer:10},"02/10/2020"));
mybkc.addblock(new Block(2,{transfer:4},"03/10/2020"));
mybkc.seechain();
mybkc.seeht();
console.log('Is Blockchain Valid? '+ mybkc.Validate());
mybkc.chain[1].height=5;
mybkc.chain[1].hash=mybkc.chain[1].calculateHash();
console.log("After tempering");
console.log('Is Blockchain Valid? '+ mybkc.Validate());
