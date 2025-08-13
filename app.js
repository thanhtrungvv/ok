// Lấy các phần tử cần thiết
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const movieGrid = document.querySelector('.main-content .grid');
const genreFilterContainer = document.querySelector('.sidebar .space-y-7 > div:first-child');
const searchInputContainer = document.querySelector('.sidebar .space-y-7');

// --- Dữ liệu phim thật ---
// Mảng dữ liệu phim được cung cấp sẵn (đã cập nhật với phim thật và poster thật từ local)
const moviesData = [
    {
        id: 1,
        title: "The Shawshank Redemption",
        year: 1994,
        genres: ["Chính kịch"],
        poster: "./images/posters/shawshank.jpg", // Đường dẫn cục bộ
        description: "Hai người đàn ông bị kết án, vượt qua nhiều thập kỷ trong tù, tìm thấy niềm an ủi và sự cứu rỗi qua những hành động tử tế chung.",
        director: "Frank Darabont",
        actors: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"]
    },
    {
        id: 2,
        title: "The Godfather",
        year: 1972,
        genres: ["Tội phạm", "Chính kịch"],
        poster: "./images/posters/godfather.jpg", // Đường dẫn cục bộ
        description: "Câu chuyện sử thi về một gia đình mafia ở Mỹ sau Thế chiến II. Đạo diễn Francis Ford Coppola.",
        director: "Francis Ford Coppola",
        actors: ["Marlon Brando", "Al Pacino", "James Caan"]
    },
    {
        id: 3,
        title: "The Dark Knight",
        year: 2008,
        genres: ["Hành động", "Tội phạm", "Chính kịch"],
        poster: "./images/posters/dark-knight.jpg", // Đường dẫn cục bộ
        description: "Khi mối đe dọa được gọi là Joker tàn phá và hỗn loạn cho người dân Gotham, Batman phải chấp nhận một trong những bài kiểm tra tâm lý và thể chất vĩ đại nhất về khả năng chiến đấu với sự bất công.",
        director: "Christopher Nolan",
        actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"]
    },
    {
        id: 4,
        title: "Pulp Fiction",
        year: 1994,
        genres: ["Tội phạm", "Chính kịch"],
        poster: "./images/posters/pulp-fiction.jpg", // Đường dẫn cục bộ
        description: "Cuộc sống của hai sát thủ mafia, một võ sĩ, vợ của một gangster và một cặp cướp nhà hàng đan xen trong bốn câu chuyện bạo lực và hài hước.",
        director: "Quentin Tarantino",
        actors: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"]
    },
    {
        id: 5,
        title: "Forrest Gump",
        year: 1994,
        genres: ["Chính kịch", "Lãng mạn"],
        poster: "./images/posters/forrest-gump.jpg", // Đường dẫn cục bộ
        description: "Cuộc đời nhiều thập kỷ của một người đàn ông đáng yêu nhưng kém cỏi trí tuệ vô tình chạm đến một số sự kiện định hình của nửa sau thế kỷ 20.",
        director: "Robert Zemeckis",
        actors: ["Tom Hanks", "Robin Wright", "Gary Sinise"]
    },
    {
        id: 6,
        title: "Inception",
        year: 2010,
        genres: ["Hành động", "Khoa học viễn tưởng", "Giật gân"],
        poster: "./images/posters/inception.jpg", // Đường dẫn cục bộ
        description: "Một tên trộm, người đánh cắp thông tin bí mật của công ty bằng công nghệ chia sẻ giấc mơ, được giao nhiệm vụ ngược lại là cấy ghép một ý tưởng vào tâm trí của một CEO.",
        director: "Christopher Nolan",
        actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"]
    },
    {
        id: 7,
        title: "The Matrix",
        year: 1999,
        genres: ["Hành động", "Khoa học viễn tưởng"],
        poster: "./images/posters/matrix.jpg", // Đường dẫn cục bộ
        description: "Một lập trình viên máy tính nhận ra cuộc sống của mình là một sự giả tạo được tạo ra bởi những cỗ máy có tri giác. Anh ta phải chiến đấu chống lại họ và giải phóng nhân loại.",
        director: "The Wachowskis",
        actors: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"]
    },
    {
        id: 8,
        title: "Interstellar",
        year: 2014,
        genres: ["Phiêu lưu", "Chính kịch", "Khoa học viễn tưởng"],
        poster: "./images/posters/interstellar.jpg", // Đường dẫn cục bộ
        description: "Một nhóm các nhà thám hiểm du hành qua một lỗ sâu để đảm bảo sự sống còn của loài người.",
        director: "Christopher Nolan",
        actors: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"]
    },
    {
        id: 9,
        title: "Parasite",
        year: 2019,
        genres: ["Hài", "Chính kịch", "Giật gân"],
        poster: "./images/posters/parasite.jpg", // Đường dẫn cục bộ
        description: "Tham vọng của gia đình Ki nghèo khó va chạm với gia đình Park giàu có. Cả hai gia đình đều bị cuốn vào một vụ việc không thể lường trước được.",
        director: "Bong Joon-ho",
        actors: ["Song Kang-ho", "Choi Woo-shik", "Park So-dam"]
    },
    {
        id: 10,
        title: "Spirited Away",
        year: 2001,
        genres: ["Hoạt hình", "Phiêu lưu", "Gia đình"],
        poster: "./images/posters/spirited-away.jpg", // Đường dẫn cục bộ
        description: "Trong khi chuyển đến một vùng ngoại ô mới, một cô gái trẻ buồn bã bước vào một thế giới bí mật do các vị thần, phù thủy và linh hồn cai trị; nơi con người bị biến thành quái vật.",
        director: "Hayao Miyazaki",
        actors: ["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki"]
    },
    {
        id: 11,
        title: "The Lion King",
        year: 1994,
        genres: ["Hoạt hình", "Phiêu lưu", "Chính kịch"],
        poster: "./images/posters/lion-king.jpg", // Đường dẫn cục bộ
        description: "Thái tử Simba chạy trốn khỏi vương quốc sau cái chết của cha mình, Mufasa, người mà anh tin rằng là lỗi của mình. Anh ta không biết rằng chú của anh ta, Scar, đã lừa dối anh ta để chiếm ngai vàng.",
        director: "Roger Allers",
        actors: ["Matthew Broderick", "Jeremy Irons", "James Earl Jones"]
    },
    {
        id: 12,
        title: "Avatar",
        year: 2009,
        genres: ["Hành động", "Phiêu lưu", "Giả tưởng"],
        poster: "./images/posters/avatar.jpg", // Đường dẫn cục bộ
        description: "Một người lính thủy đánh bộ bị liệt được gửi đến mặt trăng Pandora trong một nhiệm vụ độc đáo, nhưng anh ta bị giằng xé giữa việc tuân theo mệnh lệnh và bảo vệ thế giới anh ta cảm thấy là nhà.",
        director: "James Cameron",
        actors: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"]
    }
];

// --- Hàm xử lý chế độ Sáng/Tối ---
function enableDarkMode() {
    body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    darkModeToggle.checked = true;
}

function disableDarkMode() {
    body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    darkModeToggle.checked = false;
}

// Kiểm tra chế độ đã lưu khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});

// Lắng nghe sự kiện thay đổi của nút toggle
darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});

// --- Hàm hiển thị phim ---
function displayMovies(moviesToDisplay) {
    // Xóa nội dung cũ trong grid
    movieGrid.innerHTML = '';
    if (moviesToDisplay.length === 0) {
        movieGrid.innerHTML = '<p class="text-center col-span-full text-lg text-gray-600 dark:text-gray-400">Không tìm thấy phim nào phù hợp.</p>';
        return;
    }

    moviesToDisplay.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card', 'rounded-xl', 'overflow-hidden', 'flex', 'flex-col', 'cursor-pointer');
        movieCard.dataset.movieId = movie.id;
        movieCard.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title} Poster" class="w-full h-auto rounded-t-lg object-cover" onerror="this.onerror=null; this.src='https://placehold.co/400x600/CCCCCC/000000?text=Poster+Unavailable';">
            <div class="p-4 flex-grow flex flex-col justify-between">
                <div>
                    <h3 class="text-xl font-bold mb-1">${movie.title}</h3>
                    <p class="text-base text-gray-700 dark:text-gray-300">Năm: ${movie.year}</p>
                </div>
            </div>
        `;
        movieGrid.appendChild(movieCard);
    });
}

// --- Hàm tạo bộ lọc thể loại động ---
function generateGenreFilters() {
    // Lấy tất cả các thể loại duy nhất từ dữ liệu phim
    const allGenres = new Set();
    moviesData.forEach(movie => {
        movie.genres.forEach(genre => allGenres.add(genre));
    });

    const genresArray = Array.from(allGenres).sort();

    const genreFilterUl = genreFilterContainer.querySelector('ul');
    if (genreFilterUl) {
        genreFilterUl.innerHTML = '';
    } else {
        const ul = document.createElement('ul');
        ul.id = 'genre-checkboxes';
        ul.classList.add('space-y-3', 'text-base');
        genreFilterContainer.appendChild(ul);
        genreFilterUl = ul;
    }

    genresArray.forEach(genre => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <label class="inline-flex items-center cursor-pointer filter-link">
                <input type="checkbox" name="genre" value="${genre}" class="form-checkbox h-4 w-4 text-blue-600 rounded mr-2">
                ${genre}
            </label>
        `;
        genreFilterUl.appendChild(listItem);
    });

    genreFilterUl.addEventListener('change', applyFilters);
}

// --- Hàm thêm ô tìm kiếm phim ---
function addSearchInput() {
    if (!document.getElementById('movie-search-input')) {
        const searchDiv = document.createElement('div');
        searchDiv.innerHTML = `
            <h3 class="font-semibold text-lg mb-3 pb-2 text-gray-700 dark:text-gray-300">Tìm kiếm phim</h3>
            <input type="text" id="movie-search-input" placeholder="Tìm kiếm theo tên phim..."
                   class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                          dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-colors duration-300">
        `;
        searchInputContainer.insertBefore(searchDiv, searchInputContainer.children[1]);
    }
}

// --- Hàm Debounce ---
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

// --- Hàm áp dụng bộ lọc và tìm kiếm ---
function applyFilters() {
    let filteredMovies = [...moviesData];

    const selectedGenres = Array.from(document.querySelectorAll('#genre-checkboxes input[name="genre"]:checked'))
                                .map(checkbox => checkbox.value);

    if (selectedGenres.length > 0) {
        filteredMovies = filteredMovies.filter(movie =>
            movie.genres.some(genre => selectedGenres.includes(genre))
        );
    }

    const searchTerm = document.getElementById('movie-search-input').value.toLowerCase().trim();
    if (searchTerm) {
        filteredMovies = filteredMovies.filter(movie =>
            movie.title.toLowerCase().includes(searchTerm)
        );
    }

    displayMovies(filteredMovies);
}

// --- Hàm hiển thị Modal chi tiết phim ---
function showMovieModal(movie) {
    const modal = document.createElement('div');
    modal.id = 'movie-detail-modal';
    modal.classList.add(
        'fixed', 'inset-0', 'z-50', 'flex', 'items-center', 'justify-center',
        'bg-black', 'bg-opacity-75', 'p-4', 'fade-in'
    );

    modal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 relative max-w-4xl w-full max-h-[90vh] overflow-y-auto transform scale-95 opacity-0 transition-all duration-300 ease-out">
            <button id="close-modal-btn" class="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-3xl font-bold transition-colors z-10">
                &times;
            </button>
            <div class="flex flex-col md:flex-row gap-6">
                <div class="md:w-1/3 flex-shrink-0">
                    <img src="${movie.poster}" alt="${movie.title} Poster" class="w-full h-auto rounded-lg shadow-lg object-cover" onerror="this.onerror=null; this.src='https://placehold.co/400x600/CCCCCC/000000?text=Poster+Unavailable';">
                </div>
                <div class="md:w-2/3 flex flex-col">
                    <h2 class="text-4xl font-extrabold mb-3 text-blue-600 dark:text-blue-400">${movie.title}</h2>
                    <p class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Năm: ${movie.year}</p>
                    <p class="text-lg text-gray-600 dark:text-gray-400 mb-4">Thể loại: ${movie.genres.join(', ')}</p>
                    <p class="text-gray-800 dark:text-gray-200 text-base leading-relaxed mb-4">${movie.description}</p>
                    <div class="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p class="text-gray-700 dark:text-gray-300 font-medium text-base mb-1">Đạo diễn: <span class="font-normal">${movie.director}</span></p>
                        <p class="text-gray-700 dark:text-gray-300 font-medium text-base">Diễn viên: <span class="font-normal">${movie.actors.join(', ')}</span></p>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    setTimeout(() => {
        modal.querySelector('div').classList.remove('scale-95', 'opacity-0');
        modal.querySelector('div').classList.add('scale-100', 'opacity-100');
    }, 10);

    document.getElementById('close-modal-btn').addEventListener('click', () => {
        closeMovieModal(modal);
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeMovieModal(modal);
        }
    });

    document.addEventListener('keydown', handleEscapeKey);
    function handleEscapeKey(event) {
        if (event.key === 'Escape') {
            closeMovieModal(modal);
            document.removeEventListener('keydown', handleEscapeKey);
        }
    }

    document.body.style.overflow = 'hidden';
}

// Hàm đóng Modal chi tiết phim
function closeMovieModal(modalElement) {
    modalElement.querySelector('div').classList.remove('scale-100', 'opacity-100');
    modalElement.querySelector('div').classList.add('scale-95', 'opacity-0');

    modalElement.addEventListener('transitionend', function handler() {
        modalElement.remove();
        modalElement.removeEventListener('transitionend', handler);
    });

    document.body.style.overflow = 'auto';
}


// --- Khởi tạo ứng dụng khi DOM đã tải ---
document.addEventListener('DOMContentLoaded', () => {
    // Khởi tạo chế độ sáng/tối
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }

    generateGenreFilters();
    addSearchInput();

    const movieSearchInput = document.getElementById('movie-search-input');
    movieSearchInput.addEventListener('keyup', debounce(applyFilters, 300));

    displayMovies(moviesData);

    movieGrid.addEventListener('click', (event) => {
        const movieCard = event.target.closest('.movie-card');
        if (movieCard) {
            const movieId = parseInt(movieCard.dataset.movieId);
            const movie = moviesData.find(m => m.id === movieId);
            if (movie) {
                showMovieModal(movie);
            }
        }
    });
});

