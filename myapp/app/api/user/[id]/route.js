import Donut from "@/models/Donout";
import db from "@/lib/db";

export const GET = async (request, { params }) => {
  try {
    await db.connect();

    const userDonuts = await Donut.find({ creator: params.id }).sort({
      createAt: -1,
    });

    return new Response(JSON.stringify(userDonuts), { status: 200 });
  } catch (error) {
    return new Response("Donuts Are Still In The Oven", { status: 500 });
  }
};