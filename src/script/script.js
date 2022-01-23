let blogItem = [];

async function getBlog(){
    await fetch('https://api.freerealapi.com/blogs')
        .then(value => {
            if (value.status == 200){
                return value.json();
            } else {
                throw Error(value.status);
            }
        })
        .then(value => {
            setBlog(value.blogs);
            blogItem = value.blogs;
        })
        .catch(err => console.log(err));
}

function setBlog(blogs){
    blogs.forEach((i, index) => {
        blogInf = {
            img: i.image,
            title: i.title,
            writer: i.user.name
        }
        
        const newDiv = document.createElement("div");
        newDiv.setAttribute("onclick", `showArticle(${index})`);
        newDiv.id = `blog-${(index+1)}`;
        newDiv.innerHTML = `<div class="blog-img">
        <img src="${blogInf.img}" alt="${blogInf.title}"></div>
        <div class="blog-heading">
            <h3>${blogInf.title}</h3>
        </div>
        <div class="writer">${blogInf.writer}</div>`;

        document.querySelector(".blog").appendChild(newDiv);
    });
}

// filter and search
const writerSelect = document.querySelectorAll(".filter > div");
let filterValue = "All";

writerSelect.forEach(item => {
    item.addEventListener('click', () => {
        writerSelect.forEach(i => i.classList.remove("active"));
        item.classList.add("active");
        filterValue = item.innerHTML;

        filterFun();
    })
})

const searchInput = document.querySelector(".search > input");
searchInput.addEventListener('input', filterFun);

function filterFun(){
    const blogs = document.querySelectorAll(".blog > div");
    const blogsTitle = document.querySelectorAll(".blog-heading > h3");
    const blogsWriter = document.querySelectorAll(".writer");
    blogs.forEach(i => i.classList.add("hidden"));

    blogsTitle.forEach((item, index) => {
        if (item.innerHTML.includes(searchInput.value)){
            if (filterValue == "All"){
                blogs[index].classList.remove("hidden");
            } else if (blogsWriter[index].innerHTML == filterValue){
                blogs[index].classList.remove("hidden");
            }
        }
    })
}

// show articles
function showArticle(item) {
    const headerArt = document.querySelector(".show-header");
    const heading = document.querySelector(".heading-article > h1");
    const writer = document.querySelector(".writer-article > h3");
    const text = document.querySelector("#article");
    const tags = document.querySelector(".article-tags");

    document.querySelector(".search-body").classList.toggle("hidden");
    document.querySelector(".show-body").classList.toggle("hidden");
    window.scroll(0, 0);

    if (item != null){
        let blogSelect = blogItem[item];
        headerArt.style.backgroundImage = `url('${blogSelect.image}')`;
        heading.innerHTML = blogSelect.title;
        writer.innerHTML = blogSelect.user.name;
        text.innerHTML = blogSelect.text.split(`\n\n`).join("</br>");
        tags.innerHTML = blogSelect.tags.join(" , ");
    }
}