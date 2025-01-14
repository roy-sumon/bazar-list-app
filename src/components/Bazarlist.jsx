import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; 

const BazarList = () => {
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [language, setLanguage] = useState('en');

    const addItem = () => {
        if (itemName && price >= 0) {
            const newItem = { name: itemName, quantity, price: parseFloat(price) };
            setItems([...items, newItem]);
            setItemName('');
            setQuantity('');
            setPrice(0);
        }
    };

    const deleteItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    const totalAmount = items.reduce((total, item) => total + item.price, 0);

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    // Function to download the list as PDF
    const downloadListAsPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text(language === 'bn' ? 'বাজারের তালিকা' : 'Bazar List', 14, 22);

        const headers = [
            language === 'bn' ? 'পণ্যের নাম' : 'Item Name',
            language === 'bn' ? 'পরিমাণ' : 'Quantity',
            language === 'bn' ? 'মূল্য (Tk)' : 'Price (Tk)',
        ];

        const data = items.map(item => [
            item.name,
            item.quantity,
            `${item.price.toFixed(2)} Tk`,
        ]);

        data.push([
            language === 'bn' ? 'মোট পরিমাণ:' : 'Total Amount:',
            '',
            `${totalAmount.toFixed(2)} Tk`,
        ]);

        doc.autoTable({
            head: [headers],
            body: data,
            startY: 30,
            styles: {
                cellPadding: 5,
                lineColor: [0, 0, 0],
                lineWidth: 0.1,
                halign: 'center', 
                fontSize: 12,
            },
            columnStyles: {
                0: { cellWidth: 'auto' }, 
                1: { cellWidth: 'auto' },
                2: { cellWidth: 'auto' },
            },
        });

        doc.save('bazar_list.pdf');
    };

    return (
        <div className="max-w-md mx-auto p-4 backdrop-filter backdrop-blur-lg bg-white/30 border border-gray-300 rounded-lg shadow-lg">
            <h1 className="text-2xl text-center text-primary font-bold mb-4">{language === 'bn' ? 'বাজারের তালিকা' : 'Bazar List'}</h1>
            
            {/* Language Selection Dropdown */}
            <div className="mb-4">
                {/* <label htmlFor="language-select" className="mr-2">{language === 'bn' ? 'ভাষা নির্বাচন করুন:' : 'Select Language:'}</label> */}
                <select 
                    id="language-select" 
                    value={language} 
                    onChange={handleLanguageChange} 
                    className="border rounded p-1 bg-bg-primary border-none outline-none"
                >
                    <option value="en">English</option>
                    <option value="bn">Bangla</option>
                </select>
            </div>

            <div className="flex flex-col mb-4">
                <input 
                    type="text" 
                    placeholder={language === 'bn' ? 'পণ্যের নাম' : 'Item Name'} 
                    value={itemName} 
                    onChange={(e) => setItemName(e.target.value)} 
                    className="outline-1 outline-bg-primary rounded p-2 mb-2"
                />
                <input 
                    type="text" 
                    placeholder={language === 'bn' ? 'পরিমাণ' : 'Quantity'} 
                    value={quantity} 
                    onChange={(e) => setQuantity(e.target.value)} 
                    min="1"
                    className="outline-1 outline-bg-primary rounded p-2 mb-2"
                />
                <input 
                    type="number" 
                    placeholder={language === 'bn' ? 'মূল্য' : 'Price'} 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    min="0"
                    step="0.01"
                    className="outline-1 outline-bg-primary rounded p-2 mb-2"
                />
                <button onClick={addItem} className="bg-emerald-600 duration-300 text-white p-2 rounded hover:bg-emerald-700">
                    {language === 'bn' ? 'পণ্য যোগ করুন' : 'Add Item'}
                </button>
            </div>

            <h2 className="text-xl font-semibold">{language === 'bn' ? 'পণ্যসমূহ:' : 'Items:'}</h2>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">{language === 'bn' ? 'পণ্যের নাম' : 'Item Name'}</th>
                        <th className="border px-4 py-2">{language === 'bn' ? 'পরিমাণ' : 'Quantity'}</th>
                        <th className="border px-4 py-2">{language === 'bn' ? 'মূল্য (টাকা)' : 'Price (Taka)'}</th>
                        <th className="border px-4 py-2">{language === 'bn' ? 'অ্যাকশনস' : 'Actions'}</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{item.name}</td>
                            <td className="border px-4 py-2">{item.quantity}</td>
                            <td className="border px-4 py-2">৳ {item.price.toFixed(2)}</td>
                            <td className="border px-4 py-2">
                                <button 
                                    onClick={() => deleteItem(index)} 
                                    className="text-red-500 pl-4 hover:text-red-700 flex items-center"
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3 className="font-bold mt-4">{language === 'bn' ? 'মোট পরিমাণ: ' : 'Total Amount: '}{totalAmount.toFixed(2)} Tk</h3>

            {/* Download Button */}
            <button 
                onClick={downloadListAsPDF} 
                className="mt-4 bg-emerald-600 text-white p-2 rounded duration-300 hover:bg-emerald-700"
            >
                {language === 'bn' ? 'তালিকা ডাউনলোড করুন (PDF)' : 'Download List (PDF)'}
            </button>
        </div>
    );
};

export default BazarList;
