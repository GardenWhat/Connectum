import React, {useState} from "react";
import Autosuggest, { RenderInputComponent, GetSuggestionValue, RenderSuggestion, ChangeEvent, SuggestionsFetchRequested, SuggestionsFetchRequestedParams, OnSuggestionsClearRequested, RenderSuggestionsContainer, RenderSuggestionsContainerParams, InputProps } from "react-autosuggest";
import { faSearchLocation } from "@fortawesome/free-solid-svg-icons";
import { ListGroup, ListGroupItem, Form } from "react-bootstrap";
import "../../scss/components/TagSearch.scss";

interface ITagSuggestion {
    name: string; 
    category: string; 
}

interface ITagSearch {
    searchValue: string; 
    suggestions: ITagSuggestion[]; 
}

const tagSuggestions = [
    {
        name: "video games",
        category: "gaming"
    },
    {
        name: "vidya games",
        category: "gaming"
    }, 
    {
        name: "pokemon",
        category: "gaming"
    }, 
    {
        name: "linux",
        category: "computing"
    }
];

const getSuggestions = (search: string) => {
    const suggestions = tagSuggestions;
    search = search.trim().toLowerCase();
    return search.length == 0 ? [] : 
    suggestions.filter((suggestion) => 
    suggestion.name.trim().toLowerCase().includes(search)); 
}

const renderSuggestion: RenderSuggestion<ITagSuggestion> = (suggestion: ITagSuggestion): React.ReactNode => {
    return (
    <ListGroupItem>{suggestion.name}</ListGroupItem>
    );
}

const renderSuggestionsContainer: RenderSuggestionsContainer = (params: RenderSuggestionsContainerParams): React.ReactNode => {
    console.log(params.children);
    return (
        <ListGroup {...params.containerProps} className="tagsearch__suggestions">
            {params.children}
        </ListGroup>
    );
}

const getSuggestionValue: GetSuggestionValue<ITagSuggestion> = (suggestion: ITagSuggestion) => suggestion.name;

const renderInputComponent = (inputProps: any) => {
    return (
        <input {...inputProps} className="form-control">
        </input>
    );
}

export default () => {

    const [state, setState] = useState<ITagSearch>({searchValue: "", suggestions: tagSuggestions}); 

    const onChange: (event: React.FormEvent<any>, params: ChangeEvent) => void = 
    (event: React.FormEvent<any>, {newValue}: ChangeEvent) => {
        setState((prev) => ({
            ...prev,
            searchValue: newValue
        }))
    };

    const onSuggestionsFetchRequest: SuggestionsFetchRequested = (request: SuggestionsFetchRequestedParams) => {
        setState((prev: ITagSearch) => ({
            ...prev, 
            suggestions: getSuggestions(request.value)
        }));
    };

    const onSuggestionsClearRequest: OnSuggestionsClearRequested = () => {
        setState((prev) => ({suggestions: [], searchValue: prev.searchValue}));
    };

    return (
        <Autosuggest 
        suggestions={state.suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequest}
        onSuggestionsClearRequested={onSuggestionsClearRequest}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderSuggestionsContainer={renderSuggestionsContainer}
        inputProps={
            {
                placeholder: "Search for tags",
                value: state.searchValue,
                onChange
            }}
        renderInputComponent={renderInputComponent}
        ></Autosuggest>
    );
}