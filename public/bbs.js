"use strict";

let number=0;
const bbs = document.querySelector('#bbs');
document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    const params = {  // URL Encode
        method: "POST",
        body:  'name='+name+'&message='+message,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    console.log( params );
    const url = "/post";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
        document.querySelector('#message').value = "";
    });
});

document.querySelector('#check').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "POST",
        body:  '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        let value = response.number;
        console.log( value );

        console.log( number );
        if( number != value ) {
            const params = {
                method: "POST",
                body: 'start='+number,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'               
                }
            }
            const url = "/read";
            fetch( url, params )
            .then( (response) => {
                if( !response.ok ) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then( (response) => {
                number += response.messages.length;
                for( let mes of response.messages ) {
                    console.log( mes );  // 表示する投稿
                    let cover = document.createElement('div');
                    cover.className = 'cover';
                    let name_area = document.createElement('span');
                    name_area.className = 'name';
                    name_area.innerText = mes.name;
                    let mes_area = document.createElement('span');
                    mes_area.className = 'mes';
                    mes_area.innerText = mes.message;
                    cover.appendChild( name_area );
                    cover.appendChild( mes_area );

                    bbs.appendChild( cover );
                }
            })
        }
    });
});

document.querySelector('#bbs').addEventListener('click', (e) => {
    if (e.target.classList.contains('like')) {
        const id = e.target.dataset.id;

        fetch('/like', {
            method: "POST",
            body: 'id=' + id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                const likeCount = e.target.nextSibling;
                likeCount.innerText = `いいね: ${response.likes}`;
            }
        });
    }
});

let likeButton = document.createElement('button');
likeButton.className = 'like';
likeButton.dataset.id = mes.id;
likeButton.innerText = 'いいね';
cover.appendChild(likeButton);

let likeCount = document.createElement('span');
likeCount.innerText = `いいね: ${mes.likes || 0}`;
cover.appendChild(likeCount);

let currentPage = 1;
const postsPerPage = 5;

function loadPage(page) {
    fetch('/page', {
        method: 'POST',
        body: `page=${page}&postsPerPage=${postsPerPage}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
    .then(response => response.json())
    .then(response => {
        bbs.innerHTML = '';
        response.messages.forEach(mes => {
            let cover = document.createElement('div');
            cover.className = 'cover';
            let nameArea = document.createElement('span');
            nameArea.className = 'name';
            nameArea.innerText = mes.name;
            let mesArea = document.createElement('span');
            mesArea.className = 'mes';
            mesArea.innerText = mes.message;
            cover.appendChild(nameArea);
            cover.appendChild(mesArea);
            bbs.appendChild(cover);
        });
        currentPage = page;
    });
}

document.querySelector('#bbs').addEventListener('click', (e) => {
    if (e.target.id === 'prev') loadPage(currentPage - 1);
    if (e.target.id === 'next') loadPage(currentPage + 1);
});





