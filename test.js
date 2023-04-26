
    // Tests that adding new glasses updates the initial glass count. 
    it("test_update_glasses", async () => {
        const mockSetOpenGlass = jest.fn();
        const mockSetGlass = jest.fn();
        const mockUpdateItem = jest.fn();
        const mockLastProduct = { initialGlass: 10 };
        const mockSaled = jest.fn().mockReturnValue(3);
        const mockDayId = "123";
        const mockDoc = jest.fn();
        const mockUpdateDoc = jest.fn();
        const mockDb = {
            doc: mockDoc,
            updateDoc: mockUpdateDoc
        };
        db.mockReturnValue(mockDb);
        useContext.mockReturnValue({
            dayId: mockDayId,
            lastProduct: mockLastProduct,
            saled: mockSaled
        });
        useState.mockImplementationOnce(() => [false, mockSetOpenGlass])
            .mockImplementationOnce(() => [0, mockSetGlass]);
        updateDoc.mockImplementationOnce(mockUpdateItem);

        const wrapper = mount(<Miches />);
        wrapper.find('button').at(1).simulate('click');
        wrapper.find('input').simulate('change', { target: { value: 5 } });
        wrapper.find('button').at(2).simulate('click');

        expect(mockSetOpenGlass).toHaveBeenCalledWith(true);
        expect(mockSetGlass).toHaveBeenCalledWith(5);
        expect(mockDoc).toHaveBeenCalledWith(mockDb, "productos", mockDayId);
        expect(mockUpdateDoc).toHaveBeenCalledWith(mockDoc, {
            ...mockLastProduct,
            initialGlass: mockLastProduct.initialGlass + 5
        });
        expect(mockUpdateItem).toHaveBeenCalled();
    });

    // Tests that updating the amount of sold micheladas updates the product count. 
    it("test_update_sold_micheladas", async () => {
        const mockSetOpen = jest.fn();
        const mockItemRef = jest.fn();
        const mockUpdateDoc = jest.fn();
        const mockLastProduct = {
            fresa: 2,
            tamarindo: 3,
            pina: 4,
            mango: 5,
            clamato: 6,
            clasica: 7
        };
        const mockSaled = jest.fn().mockReturnValue(3);
        const mockDayId = "123";
        const mockDb = {
            doc: jest.fn().mockReturnValue(mockItemRef),
            updateDoc: mockUpdateDoc
        };
        db.mockReturnValue(mockDb);
        useContext.mockReturnValue({
            dayId: mockDayId,
            lastProduct: mockLastProduct,
            saled: mockSaled
        });

        const wrapper = mount(<Miches />);
        await wrapper.instance().updateItem();

        expect(mockDb.doc).toHaveBeenCalledWith("productos", mockDayId);
        expect(mockUpdateDoc).toHaveBeenCalledWith(mockItemRef, {
            ...mockLastProduct,
            initialGlass: mockLastProduct.initialGlass + 0
        });
    });

    // Tests that clicking on a product opens the modal. 
    it("test_open_modal", () => {
        const mockSetOpen = jest.fn();
        const mockSetItem = jest.fn();
        const mockOpenModal = jest.fn();
        const mockProducts = [
            { name: "Fresa", img: "fresa.png" },
            { name: "Tamarindo", img: "tamarindo.png" }
        ];
        useState.mockImplementationOnce(() => [false, mockSetOpen])
            .mockImplementationOnce(() => [null, mockSetItem]);
        useContext.mockReturnValue({});

        const wrapper = mount(<Miches />);
        wrapper.find(ItemProduct).at(0).simulate('click');

        expect(mockSetOpen).toHaveBeenCalledWith(true);
        expect(mockSetItem).toHaveBeenCalledWith(mockProducts[0]);
    });

    // Tests that adding negative number of glasses is not allowed.  
    it("test_negative_glasses", () => {
        const { getByText, getByPlaceholderText } = render(<Miches />);
        const addButton = getByText("Agregar vasos");
        fireEvent.click(addButton);
        const input = getByPlaceholderText("0");
        fireEvent.change(input, { target: { value: -5 } });
        const acceptButton = getByText("Aceptar");
        fireEvent.click(acceptButton);
        const soldText = getByText("Vendidos: 0");
        expect(soldText).toBeInTheDocument();
    });

    // Tests that adding non-numeric input for glasses is not allowed.  
    it("test_non_numeric_glasses", () => {
        const { getByText, getByPlaceholderText } = render(<Miches />);
        const addButton = getByText("Agregar vasos");
        fireEvent.click(addButton);
        const input = getByPlaceholderText("0");
        fireEvent.change(input, { target: { value: "abc" } });
        const acceptButton = getByText("Aceptar");
        fireEvent.click(acceptButton);
        const soldText = getByText("Vendidos: 0");
        expect(soldText).toBeInTheDocument();
    });

    // Tests that updating with non-numeric input for sold micheladas is not allowed.  
    it("test_non_numeric_sold_micheladas", () => {
        const { getByText, getAllByRole } = render(<Miches />);
        const productButtons = getAllByRole("button", { name: /./ });
        fireEvent.click(productButtons[0]);
        const input = getByText("Agregar la cantidad de micheladas vendidas").nextSibling.firstChild;
        fireEvent.change(input, { target: { value: "abc" } });
        const acceptButton = getByText("Aceptar");
        fireEvent.click(acceptButton);
        const soldText = getByText("Vendidos: 0");
        expect(soldText).toBeInTheDocument();
    });