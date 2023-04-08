import { toast } from "react-toastify";

const successNotify = (message: string) => toast.success(message)

const errorNotify = (message: string) => toast.error(message)

export { successNotify, errorNotify }
