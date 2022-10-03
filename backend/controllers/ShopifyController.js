const axios = require("axios");
var path = require("path");

const TokenHistory = require("../models/TokenHistory");
const Member = require("../models/Member");

exports.getRecentData = async (req, res) => {
    const rlt = await TokenHistory.find({})
        .sort({ date: -1 })
        .limit(15);
    res.send({ data: rlt });
};

exports.insertData = async (req, res) => {
    const _insertData = new TokenHistory({
        address: req.body.address,
        actiontype: req.body.actiontype,
        amount: req.body.amount,
        toaddress: req.body.toaddress
    });
    const rlt = await _insertData.save();
    res.send(rlt);
}

exports.getDashboardData = async (req, res) => {

    const _amountData = await TokenHistory.aggregate(
        [{   
            $group: {
                _id: "$actiontype",
                TotalSum: { $sum: "$amount" }
            }
        }]);
    const _lastMintData = await TokenHistory.find({ actiontype: 'mint' })
        .sort({ date: -1 })
        .limit(1);
    const _lastBurnData = await TokenHistory.find({ actiontype: 'burn' })
        .sort({ date: -1 })
        .limit(1);
    res.send({ amount: _amountData, last_mint: _lastMintData, last_burn: _lastBurnData });
}

exports.insertNewMember = async (req, res) => {
    const _insertData = new Member({
        address: req.body.address
    });
    const rlt = await _insertData.save();
    res.send(rlt);
}

exports.deleteMember = async (req, res) => {
    const _address = req.body.address;
    const rlt = await Member.remove({ address: _address });
    res.send(rlt);
}

exports.getMemberList = async (req, res) => {
    const rlt = await Member.find({})
        .sort({ date: -1 })
    res.send({ data: rlt });
}