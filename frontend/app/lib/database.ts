
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@transactions_store';

// ฟังก์ชั่นเริ่มต้นฐานข้อมูล
export const initDatabase = async () => {
  try {
    // เช็คว่าเข้าถึง storage ได้
    await AsyncStorage.getItem(STORAGE_KEY);
    console.log('เริ่มต้น AsyncStorage สำเร็จ');
    return true;
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการเริ่มต้น AsyncStorage:', error);
    throw error;
  }
};

// บันทึกธุรกรรม
export const saveTransaction = async (amount: string, date: string): Promise<string> => {
  try {
    // ดึงข้อมูลธุรกรรมเดิม
    const storedData = await AsyncStorage.getItem(STORAGE_KEY);
    const transactions = storedData ? JSON.parse(storedData) : [];

    // สร้างธุรกรรมใหม่
    const newTransaction = {
      id: Date.now().toString(),
      amount,
      date,
      created_at: Date.now()
    };

    // เพิ่มลงในอาร์เรย์และบันทึก
    transactions.push(newTransaction);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));

    console.log('บันทึกธุรกรรมสำเร็จ');
    return newTransaction.id;
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการบันทึกธุรกรรม:', error);
    throw error;
  }
};

// ดึงข้อมูลทั้งหมด
export const getAllTransactions = async () => {
  try {
    const storedData = await AsyncStorage.getItem(STORAGE_KEY);
    const transactions = storedData ? JSON.parse(storedData) : [];

    // เรียงลำดับตาม created_at (ใหม่ไปเก่า)
    return transactions.sort((a, b) => b.created_at - a.created_at);
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูลธุรกรรม:', error);
    throw error;
  }
};

// ลบธุรกรรม
export const deleteTransaction = async (id: string): Promise<void> => {
  try {
    const storedData = await AsyncStorage.getItem(STORAGE_KEY);
    if (!storedData) return;

    const transactions = JSON.parse(storedData);
    const filteredTransactions = transactions.filter(t => t.id !== id);

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredTransactions));
    console.log(`ลบธุรกรรมสำเร็จ, ID: ${id}`);
  } catch (error) {
    console.error(`เกิดข้อผิดพลาดในการลบธุรกรรม ID: ${id}`, error);
    throw error;
  }
};

// ค้นหาธุรกรรมตามวันที่
export const findTransactionsByDate = async (dateQuery: string) => {
  try {
    const transactions = await getAllTransactions();
    return transactions.filter(t => t.date.includes(dateQuery));
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการค้นหาธุรกรรม:', error);
    throw error;
  }
};