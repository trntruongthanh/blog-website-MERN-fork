import { Schema, model } from "mongoose";

let profile_imgs_name_list = [
  "Garfield",
  "Tinkerbell",
  "Annie",
  "Loki",
  "Cleo",
  "Angel",
  "Bob",
  "Mia",
  "Coco",
  "Gracie",
  "Bear",
  "Bella",
  "Abby",
  "Harley",
  "Cali",
  "Leo",
  "Luna",
  "Jack",
  "Felix",
  "Kiki",
];
let profile_imgs_collections_list = [
  "notionists-neutral",
  "adventurer-neutral",
  "fun-emoji",
];

const userSchema = new Schema(
  {
    personal_info: {
      fullname: {
        type: String,
        lowercase: true,
        required: true,
        minlength: [3, "fullname must be 3 letters long"],
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
      },
      password: String,
      username: {
        type: String,
        minlength: [3, "Username must be 3 letters long"],
        unique: true,
      },
      bio: {
        type: String,
        maxlength: [200, "Bio should not be more than 200"],
        default: "",
      },
      profile_img: {
        type: String,

        /*
        default: Nếu người dùng không cung cấp ảnh đại diện, hệ thống sẽ tự động tạo một ảnh đại diện ngẫu nhiên bằng DiceBear API. 
        
        Math.random() tạo số ngẫu nhiên trong khoảng 0 → 1.
        Math.random() * profile_imgs_collections_list.length lấy số ngẫu nhiên từ 0 đến số lượng phần tử trong mảng.
        Math.floor(...) làm tròn xuống để lấy một chỉ mục hợp lệ trong mảng.
        Math.floor(0.7 * 3) = Math.floor(2.1) = 2

        Cách DiceBear API hoạt động:
        https://api.dicebear.com/6.x/{collection}/svg?seed={name}
        {collection}: Bộ sưu tập (ví dụ: "fun-emoji")
        {name}: Tên hình đại diện (ví dụ: "Angel")
        */
        default: () => {
          return `https://api.dicebear.com/9.x/${
            profile_imgs_collections_list[
              Math.floor(Math.random() * profile_imgs_collections_list.length)
            ]
          }/svg?seed=${
            profile_imgs_name_list[
              Math.floor(Math.random() * profile_imgs_name_list.length)
            ]
          }`;
        },
      },
    },
    social_links: {
      youtube: {
        type: String,
        default: "",
      },
      instagram: {
        type: String,
        default: "",
      },
      facebook: {
        type: String,
        default: "",
      },
      twitter: {
        type: String,
        default: "",
      },
      github: {
        type: String,
        default: "",
      },
      website: {
        type: String,
        default: "",
      },
    },
    account_info: {
      total_posts: {
        type: Number,
        default: 0,
      },
      total_reads: {
        type: Number,
        default: 0,
      },
    },
    google_auth: {
      type: Boolean,
      default: false,
    },
    blogs: {
      type: [Schema.Types.ObjectId],
      ref: "Blog",
      default: [],
    },
  },
  {
    timestamps: {
      createdAt: "joinedAt",
    },
  }
);

export default model("User", userSchema);
