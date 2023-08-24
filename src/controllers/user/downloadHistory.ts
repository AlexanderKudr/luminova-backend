import { Controller } from "../../utils";


const downloadHistory: Controller = async (req, res) => {
    const { refreshToken }: { refreshToken: string } = req.cookies;
    const payload = req.body as {};
}

export { downloadHistory };