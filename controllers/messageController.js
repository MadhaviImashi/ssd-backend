const User = require("../models/user");
const Message = require("../models/message");

const getMessageHistoryByUserId = async (req, response) => {
    console.log('req', req.query.user_id)
    const user_id = req.query.user_id;

    try {
        const user = await User.findById(user_id)
            .populate("messageHistory")
        response.status(200).json({
            success: true,
            message: "GET saved messages",
            user_name: user.name,
            msgHistory: user.messageHistory
        })
    }
    catch (err) {
        console.log(err, "couldn't fetch msg history");
    }
}

const saveMessage = async (req, response) => {
    const user_id = req.body.user_id;
    const msg = req.body.message;
    let user;

    //find the user who has send the msg
    try {
        user = await User.findById(user_id);
    }
    catch (error) {
        console.log(error, 'user not found');
    }

    //track the date that user has send the message
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy;

    //track the time msg was sent
    const currentTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    try {
        const message = new Message({
            sentDate: formattedToday,
            sentTime: currentTime,
            message: msg
        });
         //save the new message object
        await message.save();

        //save the message in user's message history
        user.messageHistory.push(message);
        await user.save()
            .then((res) => {
                console.log("message saved in user's message history", user);
                response.status(200).json({
                    success: true,
                    message: "message saved successfully"
                })
        })
    }
    catch (err) {
        console.log(err, "couldn't save the message");
    }
}

const all = {
    getMessageHistoryByUserId,
    saveMessage
}

module.exports = all;