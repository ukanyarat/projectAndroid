import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
export const getAllTranfers = async () => {
    return await prisma.transfer_slip_info.findMany();
};
export const getTranferById = async (id: string) => {
    return await prisma.transfer_slip_info.findUnique({ where: { id } });
};
export const createTranfer = async (data: any) => {
    return await prisma.transfer_slip_info.create({ data, });
};
export const updateTranfer = async (id: string, data: any) => {
    return await prisma.transfer_slip_info.update({ where: { id }, data });
};
export const deleteTranfer = async (id: string) => {
    return await prisma.transfer_slip_info.delete({ where: { id } });
};