import db from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import User from "@/models/User";
import Donut from "@/models/Donout";

export async function GET(req, ctx) {
    await db.connect()

    const id = ctx.params.id

    try {
        const donut = await Donut.findById(id).populate("authorId").select('-password')

        return new Response(JSON.stringify(donut), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}