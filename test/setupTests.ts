// jest-dom adds handy assertions to Jest
import "@testing-library/jest-dom";

// For mocking the <canvas> element
import "jest-canvas-mock";

const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
	observe: () => null,
	unobserve: () => null,
});

window.IntersectionObserver = mockIntersectionObserver;
