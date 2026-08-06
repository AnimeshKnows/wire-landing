import styles from "./Tasks.module.css";

function TaskFilterBar({ activeFilter, onFilterChange, searchQuery, onSearchChange }) {
  const filters = ["All", "Pending", "Completed"];

  return (
    <div className={styles.filterBar}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <div className={styles.filterTabs}>
        {filters.map((filter) => (
          <button
            key={filter}
            className={`${styles.filterTab} ${activeFilter === filter ? styles.active : ""}`}
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TaskFilterBar;