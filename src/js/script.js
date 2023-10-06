const result = document.getElementById('result');    
const url = 'http://localhost:3000/data';


function fetchData() {

    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network error');
        }
        return response.json();
    })
    .then(data => {
    result.innerHTML = "";
        data.forEach(book => {
            const node = document.createElement("div");
            node.innerHTML = `
                <div class="card bg-light shadow-sm m-3">
                    <img src="${book.image}" class="img-fluid thumb">
                    <div class="card-body">
                        <h4 class="card-title text-truncate">${book.title}</h4>
                        <h6 class="card-text">${book.author} | ${book.releaseDate}</h6>
                        <p class="card-text text-truncate">${book.summary}</p>
                        <a href="#" class="btn btn-primary" onclick="viewData(${book.id})"><i class="bi bi-eye"></i></a>
                        <a href="#" class="btn btn-success" onclick="updateData(${book.id})"><i class="bi bi-pencil-square"></i></a>
                        <a href="#" class="btn btn-danger" onclick="deleteData(${book.id})"><i class="bi bi-trash"></i></a>
                    </div>
                </div>
            `
            result.appendChild(node);
        });
    })
    .catch(error => {
        console.error('Error : ', error);
    });
}

function postData(event) {
    event.preventDefault();

    const inputTitle = document.getElementById('title').value;
    const inputAuthor = document.getElementById('author').value;
    const inputRealese = document.getElementById('releaseDate').value;
    const inputDesc = document.getElementById('summary').value;
    const inputImage = document.getElementById('image').value;

    for (const el of document.getElementById('form').querySelectorAll("[required]")) {
        if (!el.reportValidity()) {
          return;
        }
    }

    const data = {
        id: "",
        title: inputTitle,
        author: inputAuthor,
        releaseDate: inputRealese,
        summary: inputDesc,
        image: inputImage
    }

    fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
        throw new Error('Network error');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error : ', error);
    });

}

function viewData(id) {
  
    fetch(url + `/${id}`)
    .then(response => {
        if (!response.ok) {
          throw new Error('Server returned ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        const modal = document.getElementById('modalResult')
        modal.innerHTML = `
            <img src="${data.image}" class="img-fluid mb-3 rounded-3" style="width : 100%">
            <h4>${data.title}</h4>
            <h6 class="card-text">Author : ${data.author}</h6>
            <h6 class="card-text">Release : ${data.releaseDate}</h6>
            <p class="card-text">Summary : <br>${data.summary}</p>
        `
        
        const modalId = document.getElementById('modalView');
        const openModal = new bootstrap.Modal(modalId);
        openModal.show();
    })
    .catch(error => {
        console.error('Error : ', error);
    });
}

function updateData(id) {

    fetch(url + `/${id}`)
    .then(response => {
        if (!response.ok) {
          throw new Error('Server returned ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        const modal = document.getElementById('resultEdit')        
        modal.innerHTML = `
        <form id="formModal">
            <div class="mb-3">
                <label for="title" class="form-label">Judul</label>
                <input type="text" class="form-control" id="modalTitle" value="${data.title}" required>
            </div>
            <div class="mb-3">
                <label for="author" class="form-label">Pengarang</label>
                <input type="text" class="form-control" id="modalAuthor" value="${data.author}" required>
            </div>
            <div class="mb-3">
                <label for="releaseDate" class="form-label">Tahun Rilis</label>
                <input type="number" class="form-control" id="modalReleaseDate" value="${data.releaseDate}" required>
            </div>
            <div class="mb-3">
                <label for="summary" class="form-label">Deskripsi</label>
                <textarea class="form-control" id="modalSummary" required>${data.summary}</textarea>
            </div>
            <div class="mb-3">
                <label for="image" class="form-label">Link Image Cover</label>
                <input type="text" class="form-control" id="ModalImage" value="${data.image}" required>
            </div> 
            <div class="d-grid justify-content-end">
                <button type="button" onclick="postUpdateData(${data.id})" class="btn btn-secondary">Save changes</button>
            </div>
        </form>   
        ` 

        const modalId = document.getElementById('modalEdit');
        const openModal = new bootstrap.Modal(modalId);
        openModal.show();
    })
    .catch(error => {
        console.error('Error : ', error);
    });
}

function postUpdateData(id) {
    
    const inputTitle = document.getElementById('modalTitle').value;
    const inputAuthor = document.getElementById('modalAuthor').value;
    const inputRelease = document.getElementById('modalReleaseDate').value;
    const inputDesc = document.getElementById('modalSummary').value;
    const inputImage = document.getElementById('ModalImage').value;

    for (const el of document.getElementById('formModal').querySelectorAll("[required]")) {
        if (!el.reportValidity()) {
          return;
        }
    }

    const data = {
        id: "",
        title: inputTitle,
        author: inputAuthor,
        releaseDate: inputRelease,
        summary: inputDesc,
        image: inputImage
    }

    fetch(url + `/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    .then(response => {
        if (!response.ok) {
          throw new Error('Server returned ' + response.status);
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error : ', error);
    });
}


function deleteData(id) {

    fetch(url + `/${id}`, {
        method: "DELETE",
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Network error');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error : ', error);
    });
}