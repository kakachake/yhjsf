/*
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-12-16 07:35:03
 * @LastEditors  : kakachake
 * @LastEditTime : 2019-12-18 10:04:57
 */

export function allocate(pId, pArray) {
    
    const len = this.sourceSum;
    
    for (let i = 0; i < len; i++) {
        if (pArray[i] > this.needArray[pId][i]) {
            return {
                result: false,
                msg: '所需资源数已经超过它所宣布的最大值'
            };
        }
    }
    for (let i = 0; i < len; i++) {
        if (pArray[i] > this.availArray[i]) {
            return {
                result: false,
                msg: '没有足够的资源可供分配'
            };
        }
    }
    for (let i = 0; i < len; i++) {        
        this.allocateArray[pId][i] += pArray[i];
        this.needArray[pId][i] -= pArray[i];
    }
    console.log(this.allocateArray[pId]);
    if (
        this.needArray[pId].every((x)=>{
            return x == 0
        })
    ) {
        this.statusArray[pId] = 'true';
        for (let i = 0; i < len; i++) {
            this.allocateArray[pId][i] = 0;
            this.needArray[pId][i] = 0;
        }
    }
    this.allocateArray = this.allocateArray.slice();
    this.needArray = this.needArray.slice();
    return {
        result: true,
        msg: '进行安全性算法的校验'
    };
}

export function allSafe(){
    let availArray = JSON.parse(JSON.stringify(this.availArray)); //复制一份可利用资源数组
    let finishArray = []
    var tCun = this.progressSum;
    this.statusArray.forEach((x)=>{
        if(x == 'true'){
            tCun--;
        }
    })
    console.log(tCun);
    
    let safeArray = []
    dfsSafe.call(this, 0, tCun, availArray, finishArray, safeArray);
}

export function dfsSafe(n, tCun, availArray, finishArray, safeArray){
    this.msgArray.push(
        `【进入dfs】：n：${n}。【finishArray:${finishArray}【安全序列】：${safeArray}】`
    );
    if(safeArray.length == tCun && safeArray!=0){
        this.msgArray.push(
            `<p style="background:hsl(135, 88%, 46%)">【安全序列】： 安全序列：${safeArray}。</p>`
        );
        console.log(safeArray);
        return true;
    }else{
        for(var i = 0; i < this.progressSum; i++){
            this.msgArray.push(
                `【安全检查】：响应进程${i}。`
            );
            if(finishArray[i] == 'true'){ //该进程已经完成，不再进行判断
                this.msgArray.push(
                    `【安全检查】：进程${i}，该进程已完成，不再进行判断。`
                );
                continue;
            }else{
                if(this.statusArray[i] == 'true'){
                    finishArray[i] == 'true';
                    this.msgArray.push(
                        `【安全检查】：进程${i}，该进程已完成，不再进行判断。`
                    );
                    continue;
                }
                if(availArray.every((item, idx)=>{
                    return item >= this.needArray[i][idx];
                })){
                    this.msgArray.push(
                        `【安全检查】：进程${i}，该进所需资源数小于系统可用资源,满足运行条件。`
                    );
                    safeArray.push(i);
                    availArray = availArray.map((item, idx)=>{
                        return item+this.allocateArray[i][idx];
                    })
                    finishArray[i] = 'true';
                    dfsSafe.call(this, n+1,tCun, availArray, finishArray, safeArray);
                    finishArray[i] = 'false';
                    availArray = availArray.map((item, idx)=>{
                        return item-this.allocateArray[i][idx];
                    })
                    safeArray.pop();
                }else{
                    this.msgArray.push(
                        `【安全检查】：进程${i}，该进所需资源数大于系统可用资源,不满足运行条件。`
                    );
                }
            }
        }
    }
}

export function isSafe(){
    let availArray = JSON.parse(JSON.stringify(this.availArray)); //复制一份可利用资源数组
    // console.log(availArray);
    var tCun = 0;
    this.statusArray.forEach((x)=>{
        if(x == 'true'){
            tCun++;
        }
    })
    let safeArray = []; //当前安全状态序列
    const finishArray = []; //复制一份状态数组
    let flag = false; //定义循环结束的标志
    let pFlag = -1;// 定义一个循环标志，用来判断一次循环是否状态数组有改变
    let cun = 1;
    while(!flag){
        for(var i = 0; i < this.progressSum; i++){
            this.msgArray.push(
                `【安全检查】：第${cun}轮循环：响应进程${i}。`
            );
            if(finishArray[i] == 'true'){ //该进程已经完成，不再进行判断
                this.msgArray.push(
                    `【安全检查】：第${cun}轮循环：进程${i}，该进程已完成，不再进行判断。`
                );
                continue;
            }else{
                if(this.statusArray[i] == 'true'){
                    finishArray[i] == 'true';
                    this.msgArray.push(
                        `【安全检查】：第${cun}轮循环：进程${i}，该进程已完成，不再进行判断。`
                    );
                    continue;
                }
                pFlag = 0;
                if(availArray.every((item, idx)=>{
                    return item >= this.needArray[i][idx];
                })){
                    this.msgArray.push(
                        `【安全检查】：第${cun}轮循环：进程${i}，该进所需资源数小于系统可用资源,满足运行条件。`
                    );
                    safeArray.push(i);
                    pFlag = 1;
                    availArray = availArray.map((item, idx)=>{
                        return item+this.allocateArray[i][idx];
                    })
                    finishArray[i] = 'true';
                }else{
                    this.msgArray.push(
                        `【安全检查】：第${cun}轮循环：进程${i}，该进所需资源数大于系统可用资源,不满足运行条件。`
                    );
                }
            }
        }
        this.msgArray.push(
            `【安全检查】：第${cun}轮循环完成：本轮循环后进程序列：${safeArray}。`
        );
        console.log("safeLength"+safeArray.length);
        console.log("tCun"+tCun);
        console.log("progress"+this.progressSum);
        
        if(safeArray.length == this.progressSum-tCun || pFlag == 0){ //当所有进程都处于完成状态或者一轮循环后状态全都没有发生改变
            console.log("succ");
            flag = 1;
        }
        cun++;
    }
    if(safeArray.length == this.progressSum - tCun){
        console.log("return succ");
        
        return safeArray;
    }else{
        return false;
    }
}
