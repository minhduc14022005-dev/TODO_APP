import { Request, Response } from "express";
import { TaskController } from "../controllers/task.controller";
import { ITaskService } from "../services/task.service";

describe('TaskController - Unit Test', () => {
    let mockTaskService: jest.Mocked<ITaskService>;
    let taskController: TaskController;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockJson: jest.Mock;
    let mockStatus: jest.Mock;

    beforeEach(() => {
        mockTaskService = {
            createTask: jest.fn(),
            getAllTaskDesc: jest.fn(),
            updateTaskById: jest.fn(),
            deleteTaskById: jest.fn()
        };

        taskController = new TaskController(mockTaskService);

        mockJson = jest.fn();
        mockStatus = jest.fn().mockReturnValue({ json: mockJson });
        mockRequest = { query: {}};
        mockResponse = { json: mockJson, status: mockStatus };
    });
    it('Kịch bản 1: Lấy danh sách task thành công (Trả về status 200)', async () => {
        const fakeData = {
            tasks: [{ _id: '1', title: 'Task Test', isCompleted: false }], 
            pagination: { totalItems: 1, totalPages: 1, currentPage: 1, pageSize: 10 }
        };
        // Mock lấy danh sách task
        mockTaskService.getAllTaskDesc.mockResolvedValue(fakeData as any);
        await taskController.getAllTaskDesc(mockRequest as Request, mockResponse as Response);
        // Kiểm tra xem Controller có gọi đúng hàm status(200) không
        expect(mockStatus).toHaveBeenCalledWith(200);
        // Kiểm tra xem Controller có trả về dữ liệu cho client không
        expect(mockJson).toHaveBeenCalledWith({
            success: true,
            message: 'Lấy danh sách task thành công',
            data: fakeData.tasks,
            pagination: fakeData.pagination
        });
    });
    it('Kịch bản 2: Lấy danh sách bị LỖI (Trả về status 500)', async () => {
        mockTaskService.getAllTaskDesc.mockRejectedValue(new Error('Lỗi đứt cáp quang'));

        await taskController.getAllTaskDesc(mockRequest as Request, mockResponse as Response);

        // Kiểm tra xem Controller có bắt được lỗi không
        expect(mockStatus).toHaveBeenCalledWith(500);
        expect(mockJson).toHaveBeenCalledWith({
            success: false,
            message: 'Lỗi đứt cáp quang'
        });
    });
});