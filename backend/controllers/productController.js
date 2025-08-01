


//function for add product
const addProduct = async(req,res) => {
    try {
        console.log('=== DEBUG INFO ===');
        console.log('req.headers:', req.headers);
        console.log('Content-Type:', req.headers['content-type']);
        console.log('req.files:', req.files);
        console.log('req.body:', req.body);
        console.log('==================');
        
        const {name,description,price,category,subCategory,sizes,bestSeller} = req.body

        const image1 = req.files?.image1?.[0]
        const image2 = req.files?.image2?.[0]
        const image3 = req.files?.image3?.[0]
        const image4 = req.files?.image4?.[0]

        console.log(name,description,price,category,subCategory,sizes,bestSeller)
        console.log(image1,image2,image3,image4)
        
        console.log('req.files:', req.files)
        console.log('req.body:', req.body)

        res.json({success: true, message: "Product received"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//function for list product
const listProduct = async(req,res) => {

}

//function for removing product
const removeProduct = async(req,res) => {

}

//function for single product
const singleProduct = async(req,res) => {

}

export {addProduct,listProduct,removeProduct,singleProduct}