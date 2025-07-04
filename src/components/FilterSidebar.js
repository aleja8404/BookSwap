import React from 'react';

const FilterSidebar = ({
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
  searchTerm,
  onSearchTermChange,
}) => {
  return (
    <div className="w-72 bg-white rounded-2xl shadow-lg p-6 flex-shrink-0">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Filtros</h2>

      <div className="mb-8">
        <label htmlFor="search-term" className="block text-gray-700 text-lg font-medium mb-2">
          Buscar por Título
        </label>
        <input
          type="text"
          id="search-term"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-lg"
          placeholder="Ej. Cien años de soledad"
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
        />
      </div>

      <div className="mb-8">
        <label htmlFor="category-filter" className="block text-gray-700 text-lg font-medium mb-2">
          Categoría
        </label>
        <select
          id="category-filter"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-lg"
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

      <div className="mb-8">
        <label htmlFor="publisher-filter" className="block text-gray-700 text-lg font-medium mb-2">
          Editorial
        </label>
        <select
          id="publisher-filter"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-lg"
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

      <div className="mb-8">
        <label htmlFor="author-filter" className="block text-gray-700 text-lg font-medium mb-2">
          Autor
        </label>
        <select
          id="author-filter"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-lg"
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
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-lg"
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

export default FilterSidebar;