import mongoose from "mongoose";
import { ISendMoney } from "./sendMoney.interface";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { User } from "../users/user.model";
import { generateTransactionId } from "../../../utils/transIdGenarate";
import { SendMoney } from "./sendMoney.model";

const transactions = async (payload: ISendMoney) => {
  const { senderId, receivedId, amount, pin } = payload;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      // Fetch sender and receiver details
      const sender = await User.findOne({ mobile: senderId }).session(session);
      const receiver = await User.findOne({ mobile: receivedId }).session(
        session
      );
      if (!sender || !receiver) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "Sender or receiver not found"
        );
      }
      //check user pin correct or wrong
      const isUserExist = await User.isUserExist(senderId);
      if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
      }
      if (
        isUserExist.pin &&
        !(await User.isPasswordMatched(pin, isUserExist.pin))
      ) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Pin is incorrect");
      }
      //check sender balance
      if (sender.balance < amount) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Insufficient balance");
      }
      if (sender.balance < 10) {
        throw new ApiError(
          httpStatus.BAD_GATEWAY,
          "Send less than 10 taka cannot be accepted"
        );
      }
      let transferAmount = amount;

      if (amount > 100) {
        transferAmount += 5; // Charge 5 taka if the amount is over 100 taka
      }
      sender.balance -= transferAmount;
      receiver.balance += Number(amount);

      const transId = await generateTransactionId(10);

      // Save updated balances

      await User.findOneAndUpdate(sender._id, {
        balance: sender.balance,
      });
      await User.findOneAndUpdate(receiver._id, {
        balance: receiver.balance,
      });

      const transData = {
        senderId: senderId,
        receivedId: receivedId,
        amount: amount,
        transactionId: transId,
      };
      const transHistory = await SendMoney.create(transData);
      // console.log(senderStore, receiverStore);
      // push user transaction store array
      await User.findByIdAndUpdate(sender?._id, {
        $push: { transactions: { $each: [transHistory?._id], $position: 0 } },
      });
      await User.findByIdAndUpdate(receiver?._id, {
        $push: { transactions: { $each: [transHistory?._id], $position: 0 } },
      });
    });
    return `${amount} taka has been sent to number ${senderId} to ${receivedId}`;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, `${error}`);
  } finally {
    session.endSession();
  }
};

export const SendMoneyService = {
  transactions,
};
