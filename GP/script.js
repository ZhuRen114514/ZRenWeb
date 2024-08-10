document.addEventListener("DOMContentLoaded", function() {
    const fileExplorer = document.getElementById("file-explorer");
    const fileList = document.getElementById("file-list");
    const backButton = document.getElementById("back-button");

    let currentPath = "";

    function loadDirectory(path) {
        fetch(`/list-directory?path=${encodeURIComponent(path)}`)
            .then(response => response.json())
            .then(data => {
                fileList.innerHTML = "";
                currentPath = path;

                if (path) {
                    backButton.style.display = "block";
                } else {
                    backButton.style.display = "none";
                }

                data.forEach(item => {
                    const li = document.createElement("li");
                    li.textContent = item.name;
                    li.dataset.path = item.path;

                    if (item.isDirectory) {
                        li.addEventListener("click", () => loadDirectory(item.path));
                    } else {
                        li.addEventListener("click", () => openFile(item.path));
                    }

                    fileList.appendChild(li);
                });
            })
            .catch(error => console.error("Error loading directory:", error));
    }

    function openFile(path) {
        window.location.href = `/open-file?path=${encodeURIComponent(path)}`;
    }

    backButton.addEventListener("click", () => {
        const parentPath = currentPath.split("/").slice(0, -1).join("/");
        loadDirectory(parentPath);
    });

    loadDirectory("");
});
