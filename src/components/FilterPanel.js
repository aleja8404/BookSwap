import React from 'react';

const FilterPanel = ({
  categories,
  publishers,
  authors,
  publicationYears,
  selectedCategory,
  selectedPublisher,
  selectedAuthor,
  selectedYear,
  onSelectCategory,
  onSelectPublisher,
  onSelectAuthor,
  onSelectYear,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Filtros</h2>

      <div className="mb-6">
        <label htmlFor="category-filter" className="block text-gray-700 text-lg font-medium mb-2">
          Categoría
        </label>
        <select
          id="category-filter"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-base"
          value={selectedCategory}
          onChange={(e) => onSelectCategory(e.target.value)}
        >
          <option value="Todas">Todas</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="publisher-filter" className="block text-gray-700 text-lg font-medium mb-2">
          Editorial
        </label>
        <select
          id="publisher-filter"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-base"
          value={selectedPublisher}
          onChange={(e) => onSelectPublisher(e.target.value)}
        >
          <option value="Todas">Todas</option>
          {publishers.map((publisher) => (
            <option key={publisher} value={publisher}>
              {publisher}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="author-filter" className="block text-gray-700 text-lg font-medium mb-2">
          Autor
        </label>
        <select
          id="author-filter"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-base"
          value={selectedAuthor}
          onChange={(e) => onSelectAuthor(e.target.value)}
        >
          <option value="Todos">Todos</option>
          {authors.map((author) => (
            <option key={author} value={author}>
              {author}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="year-filter" className="block text-gray-700 text-lg font-medium mb-2">
          Año de Publicación
        </label>
        <select
          id="year-filter"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-base"
          value={selectedYear}
          onChange={(e) => onSelectYear(e.target.value)}
        >
          <option value="Todos">Todos</option>
          {publicationYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;