import React, {useState} from "react";
import Autosuggest, { RenderInputComponent, GetSuggestionValue, RenderSuggestion, ChangeEvent, SuggestionsFetchRequested, SuggestionsFetchRequestedParams, OnSuggestionsClearRequested, RenderSuggestionsContainer, RenderSuggestionsContainerParams, InputProps, RenderSuggestionParams } from "react-autosuggest";
import { ListGroup, ListGroupItem, Form } from "react-bootstrap";
import "../../scss/components/TagSearch.scss";

export interface ITagSuggestion {
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

const renderSuggestion: RenderSuggestion<ITagSuggestion> = (suggestion: ITagSuggestion, params: RenderSuggestionParams): React.ReactNode => {
    const query = params.query; 
    const index = suggestion.name.indexOf(query); 
    const render = <span>{suggestion.name.slice(0, index)}<span className="suggestion">{query}</span>{suggestion.name.slice(index + query.length)}</span>;
    return (
    <ListGroupItem className="listgroup-item">{render}</ListGroupItem>
    );
}

const renderSuggestionsContainer: RenderSuggestionsContainer = (params: RenderSuggestionsContainerParams): React.ReactNode => {
    return (
        <ListGroup {...params.containerProps} className="tagsearch__suggestions">
            {params.children}
        </ListGroup>
    );
}


const renderInputComponent = (inputProps: any) => {
    return (
        <input {...inputProps} className="form-control">
        </input>
    );
}

interface ITagSearchProps {
    selectTag: (tag: ITagSuggestion) => void; 
}

export default (props: ITagSearchProps) => {

    const [state, setState] = useState<ITagSearch>({searchValue: "", suggestions: tagSuggestions}); 

    const getSuggestionValue: GetSuggestionValue<ITagSuggestion> = (suggestion: ITagSuggestion) => 
    {
        setState(prev => ({...prev, searchValue: ""}));
        props.selectTag(suggestion);
        return ""
    };

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