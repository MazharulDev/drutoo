import mongoose from "mongoose";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { User } from "../users/user.model";
import { generateTransactionId } from "../../../utils/transIdGenarate";
import { ICashin } from "./cashin.interface";
import { Transaction } from "../transactions/transactions.model";

const cashin = async (payload: ICashin) => {
  const { senderId, receivedId, amount, pin } = payload;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      // Fetch sender and receiver details
      const sender = await User.findOne({ mobile: senderId }).session(session);
      const receiver = await User.findOne({ mobile: receivedId }).session(
        session
      );
      if (receiver?.role !== "user") {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "This number is not a personal number"
        );
      }
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
      // check balance less than 10 taka

      if (sender.balance < 10) {
        throw new ApiError(
          httpStatus.BAD_GATEWAY,
          "Send less than 10 taka cannot be accepted"
        );
      }
      let transferAmount = Number(amount);

      sender.balance -= Number(transferAmount);
      receiver.balance += Number(amount);
      // Transaction id
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
        through: "cashin",
      };
      const transHistory = await Transaction.create(transData);
      // push user transaction store array
      await User.findByIdAndUpdate(sender?._id, {
        $push: { transactions: { $each: [transHistory?._id], $position: 0 } },
      });
      await User.findByIdAndUpdate(receiver?._id, {
        $push: { transactions: { $each: [transHistory?._id], $position: 0 } },
      });
    });
    return `${amount} taka has been cashin to number  ${receivedId}`;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, `${error}`);
  } finally {
    session.endSession();
  }
};

export const CashinService = {
  cashin,
};
