import Tweet from "../models/tweets";
import Comment from "../models/comments";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";

// 트윗 생성하기
export const createTweet = async (req, res) => {
  const {
    file,
    body: { formData: content },
    session: {
      user: { id },
    },
  } = req;

  try {
    if (file) {
      const locationRef = ref(storage, `tweets/${Date.now()}`);
      const metadata = {
        contentType: file.mimetype,
      };

      // upload file in the bucket storage
      // by using uploadBytesResumable we can control the progress of uploading
      const snapshot = await uploadBytesResumable(
        locationRef,
        file.buffer,
        metadata
      );
      const url = await getDownloadURL(snapshot.ref);

      const tweetData = await Tweet.create({
        content,
        writer: id,
        photo: url,
        createdAt: Date.now(),
      });

      return res.send({
        result: true,
        message: "트윗 작성을 성공했습니다!",
        tweetData,
      });
    } else {
      // file 이 없으면
      return res.send({ result: false, message: "파일을 첨부해 주세요. " });
    }
  } catch (error) {
    console.log(error);
  }
};

// 트위 읽기
export const readTweet = async (req, res) => {
  try {
    const data = await Tweet.find({})
      .sort({ createdAt: -1 })
      .populate({ path: "writer", select: "avatar createdAt username email" })
      .populate({
        path: "comments",
        populate: { path: "writer", select: "avatar createdAt username email" },
      });

    res.send({ result: true, data });
  } catch (error) {
    console.log(error);
  }
};

// 코멘트 작성하기
export const createComment = async (req, res) => {
  const {
    params: { tweetId },
    body: { comment },
    session: {
      user: { id: userId },
    },
  } = req;

  try {
    const data = await Comment.create({
      comment,
      writer: userId,
      tweet: tweetId,
      createdAt: Date.now(),
    });

    await Tweet.findByIdAndUpdate(
      tweetId,
      { $push: { comments: data._id } },
      { new: true }
    );
    res.send({ result: true, data });
  } catch (error) {
    console.log(error);
  }
};

// 프로필 페이지 트윗 가져오기
export const getProfileTweet = async (req, res) => {
  const {
    params: { userId },
  } = req;

  try {
    const data = await Tweet.find({ writer: userId }).sort({ createdAt: -1 });
    res.send({ result: true, data });
  } catch (error) {
    error;
  }
};
