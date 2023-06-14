const BASE_URL = "http://localhost:8000/";

export const apiUrls = {
  note: (id) => BASE_URL + (id ? `note/${id}/` : "note/"),
  tag: (id) => BASE_URL + (id ? `tag/${id}/` : "tag/"),
};
