import { useEffect, useState } from 'react'
import axios from 'axios'

export const TableSitemap = ({ menu, level = 1, defineUl = true }) => {
    return (
        <ul
          className={`${
            defineUl ? "nav-menu-list-item-list" : "ah-newnavbar-desktop"
          }`}
        >
          {menu.map((i) => (
            <li
              className={`menu-id-${i.id} nav-menu-list-item list-item--0${level} ${
                i.hasChildren
                  ? `has-children ${i.children.length > 14 ? "column-4" : ""}`
                  : ""
              }`}
            >
              <a href={i.url} className="nav-menu-list-item-link">
                {i.name}
              </a>
              {i.hasChildren && (
                  <TableSitemap
                    menu={i.children}
                    level={level + 1}
                    defineUl={true}
                  />
              )}
            </li>
          ))}
        </ul>
      );
}

const SiteMap = () => {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        const options = {
            method: 'GET',
            url: '/api/catalog_system/pub/category/tree/5',
        }

        axios
            .request(options)
            .then(function (response) {
                const { data } = response;
                console.log(data)
                setCategory(data)
            })
            .catch(function (error) {
                console.error(error)
            })
    }, [])

    return <TableSitemap menu={category} level={1} defineUl={false} />
}
export default SiteMap
