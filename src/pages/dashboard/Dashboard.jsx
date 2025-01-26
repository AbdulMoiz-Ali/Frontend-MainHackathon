import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [maxLoan, setMaxLoan] = useState("");
    const [loanPeriod, setLoanPeriod] = useState("");

    const [subCategoryName, setSubCategoryName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    // Fetch Categories on Component Load
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("https://backend-main-hackathon.vercel.app/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        try {
            const newCategory = {
                name: categoryName,
                Maxloan: maxLoan,
                Loanperiod: loanPeriod,
            };
            await axios.post("https://backend-main-hackathon.vercel.app/categories", newCategory);
            fetchCategories(); // Refresh categories
            setCategoryName("");
            setMaxLoan("");
            setLoanPeriod("");
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };

    const handleAddSubCategory = async (e) => {
        e.preventDefault();
        try {
            const newSubCategory = {
                name: subCategoryName,
                category: selectedCategory,
            };
            await axios.post("https://backend-main-hackathon.vercel.app/subcategories", newSubCategory);
            fetchCategories(); // Refresh categories to include subcategories
            setSubCategoryName("");
            setSelectedCategory("");
        } catch (error) {
            console.error("Error adding subcategory:", error);
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            await axios.delete(`https://backend-main-hackathon.vercel.app/categories/${id}`);
            fetchCategories(); // Refresh categories
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    const handleDeleteSubCategory = async (id) => {
        try {
            await axios.delete(`https://backend-main-hackathon.vercel.app/subcategories/${id}`);
            fetchCategories(); // Refresh categories
        } catch (error) {
            console.error("Error deleting subcategory:", error);
        }
    };





    return (
        <>

            <div className="min-h-screen bg-gray-100 p-8">
                <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Add Category */}
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Add Category</h2>
                        <form onSubmit={handleAddCategory}>
                            <input
                                type="text"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                placeholder="Category Name"
                                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                                required
                            />
                            <input
                                type="text"
                                value={maxLoan}
                                onChange={(e) => setMaxLoan(e.target.value)}
                                placeholder="Max Loan"
                                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                                required
                            />
                            <input
                                type="text"
                                value={loanPeriod}
                                onChange={(e) => setLoanPeriod(e.target.value)}
                                placeholder="Loan Period"
                                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                            >
                                Add Category
                            </button>
                        </form>
                    </div>

                    {/* Add Subcategory */}
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Add Subcategory</h2>
                        <form onSubmit={handleAddSubCategory}>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                                required
                            >
                                <option value="">Select a Category</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="text"
                                value={subCategoryName}
                                onChange={(e) => setSubCategoryName(e.target.value)}
                                placeholder="Subcategory Name"
                                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                            >
                                Add Subcategory
                            </button>
                        </form>
                    </div>
                </div>

                {/* Display Categories and Subcategories */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Categories and Subcategories</h2>
                    {categories.map((cat) => (
                        <div key={cat._id} className="p-4 bg-white rounded-lg shadow-md mb-4">
                            <div className="flex justify-between">
                                <h3 className="text-lg font-bold">{cat.name}</h3>
                                <button
                                    onClick={() => handleDeleteCategory(cat._id)}
                                    className="text-red-600 hover:underline"
                                >
                                    Delete
                                </button>
                            </div>
                            {cat.subcategories.length > 0 ? (
                                <ul className="mt-2 list-disc list-inside">
                                    {cat.subcategories.map((subCat) => (
                                        <li key={subCat._id} className="flex justify-between">
                                            {subCat.name}
                                            <button
                                                onClick={() => handleDeleteSubCategory(subCat._id)}
                                                className="text-red-600 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="mt-2 text-gray-500">No subcategories yet</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}


export default Dashboard
