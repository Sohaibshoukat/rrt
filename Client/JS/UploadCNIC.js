// UploadCNIC.js

// JavaScript code to fetch and display user's CNIC images

// Function to fetch and display the CNIC front image
const fetchCNICFrontImage = async () => {
    try {
        // Make an API call to get the CNIC front image
        const response = await fetch(`http://localhost:5000/api/user/FetchFrontImage/${localStorage.getItem("token")}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const responseData = await response.json();
            if (responseData.success) {
                const imageElement = document.createElement('img');
                imageElement.src = responseData.image;
                imageElement.alt = 'CNIC Front Image';

                const imageContainer = document.querySelector('.Image.front');
                imageContainer.appendChild(imageElement);
            } else {
                console.error('Failed to fetch CNIC front image.');
            }
        } else {
            console.error('Failed to fetch CNIC front image. Server response not ok.');
        }
    } catch (error) {
        console.error('Error occurred during image fetch:', error);
    }
};

// Function to fetch and display the CNIC back image
const fetchCNICBackImage = async () => {
    try {
        // Make an API call to get the CNIC back image
        const response = await fetch(`http://localhost:5000/api/user/FetchBackImage/${localStorage.getItem("token")}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData)
            if (responseData.success) {
                const imageElement = document.createElement('img');
                imageElement.src = responseData.image;
                imageElement.alt = 'CNIC Back Image';

                const imageContainer = document.querySelector('.Image.back');
                imageContainer.appendChild(imageElement);
            } else {
                console.error('Failed to fetch CNIC back image.');
            }
        } else {
            console.error('Failed to fetch CNIC back image. Server response not ok.');
        }
    } catch (error) {
        console.error('Error occurred during image fetch:', error);
    }
};

// Call the functions to fetch and display the images
fetchCNICFrontImage();
fetchCNICBackImage();



// Function to handle the image upload and API call
document.getElementById('FrontImage').addEventListener('click', async () => {
    const imageInput = document.getElementById('cnicimg');
    const imageFile = imageInput.files[0];

    if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        // You'll need to provide a valid token here
        formData.append('token', localStorage.getItem("token"));

        try {
            const response = await fetch('http://localhost:5000/api/user/UploadFrontImage', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const responseData = await response.json();
                if (responseData.success) {
                    // Image uploaded successfully
                    location.reload()
                    // You can perform any additional actions here, like updating the UI.
                } else {
                    alert('Image upload failed.');
                }
            } else {
                alert('Image upload failed. Server response not ok.');
            }
        } catch (error) {
            alert('Error occurred during image upload:', error);
        }
    } else {
        alert('No image selected.');
    }
});


document.getElementById('BackImage').addEventListener('click', async () => {
    const imageInput = document.getElementById('cnicbackimg');
    const imageFile = imageInput.files[0];

    if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        // You'll need to provide a valid token here
        formData.append('token', localStorage.getItem("token"));

        try {
            const response = await fetch('http://localhost:5000/api/user/UploadbackImage', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const responseData = await response.json();
                if (responseData.success) {
                    // Image uploaded successfully
                    location.reload()
                    // You can perform any additional actions here, like updating the UI.
                } else {
                    console.error('Image upload failed.');
                }
            } else {
                console.error('Image upload failed. Server response not ok.');
            }
        } catch (error) {
            console.error('Error occurred during image upload:', error);
        }
    } else {
        console.error('No image selected.');
    }
});
