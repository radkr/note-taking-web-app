export const mockPlainNotes = [
  {
    _id: 0,
    title: "React Performance Optimization",
    tags: ["Dev", "React"],
    content:
      "Key performance optimization techniques:\n\n1. Code Splitting\n- Use React.lazy() for route-based splitting\n- Implement dynamic imports for heavy components\n\n2. Memoization\n- useMemo for expensive calculations\n- useCallback for function props\n- React.memo for component optimization\n\n3. Virtual List Implementation\n- Use react-window for long lists\n- Implement infinite scrolling\n\nTODO: Benchmark current application and identify bottlenecks",
    lastEdited: "2024-10-29T10:15:00Z",
    isArchived: false,
  },
  {
    _id: 1,
    title: "Japan Travel Planning",
    tags: ["Travel", "Personal"],
    content:
      "Japan Trip Planning - Spring 2025\n\nItinerary Draft:\nWeek 1: Tokyo\n- Shibuya and Harajuku\n- TeamLab Digital Art Museum\n- Day trip to Mount Fuji\n\nWeek 2: Kyoto & Osaka\n- Traditional temples\n- Cherry blossom viewing\n- Food tour in Osaka\n\nBudget: $3000\nAccommodation: Mix of hotels and traditional ryokans\nJR Pass: 14 days\n\nTODO: Book flights 6 months in advance",
    lastEdited: "2024-10-28T16:45:00Z",
    isArchived: false,
  },
];

export const mockNotes = [
  {
    _id: 0,
    toObject: () => mockPlainNotes[0],
  },
  {
    _id: 1,
    toObject: () => mockPlainNotes[1],
  },
];
