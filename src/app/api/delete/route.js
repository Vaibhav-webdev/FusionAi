// app/api/passwords/delete/route.js
import { connectDB } from "../../../lib/db";
import User from "../../../models/User";
import { auth } from "../../auth"

export async function DELETE(req) {
  await connectDB(); // 🔥 VERY IMPORTANT
  const { id } = await req.json();
  
  const session = await auth()
  const email = session.user.email
  
  await User.updateOne(
    {
      email: email,
    },
    {
      $pull: {
        thumbnails: { _id: id },
      },
    }
  );

  return Response.json({ success: true });
}