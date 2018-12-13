
var Player = require("Player");

cc.Class({
    extends: cc.Component,

    properties: {
        BlockList:{
            default: [], 
            type: [cc.Node],
            visible: true
        },

        PlayerObj:{
            default: null,
            type: [Player],
            visible: true
        },

        blockSize:500,
        blockCount:3,
        layerSize:0,
        startBlockIdx:1,
        startPos:0,
        maxLayerRange:3,
        lastBlockOffset:0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox = true;

        this.blockSize = 490;
        this.blockCount = 3;
        this.layerSize = this.blockSize * this.blockCount;
        this.startBlockIdx = this.GetBlockIndex(this.PlayerObj);

        this.startPos = this.PlayerObj.node.z;
    },

    update (dt) {

        this.ClampPlayerInRange();

        var blockOffset =  this.GetBlockIndex(this.PlayerObj) - this.startBlockIdx;
        if(this.lastBlockOffset == blockOffset)
        {
            return;
        }
        this.lastBlockOffset = blockOffset;

        for(var i = 0;i < this.BlockList.length;i++)
        {
            var block = this.BlockList[i];
            block.z =  (blockOffset + i) * (this.blockSize);
            //cc.log("Z:" + block.z);
        }
    },

    GetBlockIndex:function(Obj)
    {
        var posZ = Obj.node.z;
        var iIndex = Math.floor(posZ / this.blockSize);
        if(iIndex < 0)
        {
            iIndex = iIndex - 1;
        }
        return iIndex;
    },

    ClampPlayerInRange:function()
    {
        var playerZ = this.PlayerObj.node.z;
        var tempZ = playerZ;
        if(playerZ > this.layerSize * this.maxLayerRange + this.startPos ||
           playerZ < -this.layerSize * this.maxLayerRange + this.startPos)
        {
            tempZ = this.startPos;
        }
        this.PlayerObj.node.z =  tempZ;  
    },
});
